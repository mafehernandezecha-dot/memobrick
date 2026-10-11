-- MEMOBRICK CONTROL CENTER — initial schema
-- One authoritative inventory database. The Website Editor, MemoBrick Studio
-- and Shopify only ever *send facts* here (designs, orders); every stock and
-- reservation total is computed and stored in this database alone.

create extension if not exists citext;

/* ------------------------------------------------------------------ users */
create table users (
  id            serial primary key,
  email         citext not null unique,
  name          text not null,
  role          text not null check (role in ('admin', 'production')),
  password_hash text not null,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create table sessions (
  token_hash  text primary key,
  user_id     integer not null references users(id) on delete cascade,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

-- machine credentials for the editors (Studio uses one; the public website
-- connector does not need one, see designs.verified)
create table api_keys (
  id          serial primary key,
  name        text not null,
  key_hash    text not null unique,
  scope       text not null check (scope in ('studio')),
  created_at  timestamptz not null default now(),
  revoked_at  timestamptz
);

/* -------------------------------------------------------- inventory items */
create table items (
  id             serial primary key,
  sku            text not null unique,
  category       text not null check (category in ('brick', 'board', 'tool')),
  name           text not null,
  color_code     text unique,             -- MemoBrick code, bricks only ("001")
  hex            text,
  supplier_code  text,
  unit           text not null default 'pcs',
  -- NULL means "not counted yet". It is never treated as zero.
  on_hand        integer,
  reserved       integer not null default 0 check (reserved >= 0),
  min_level      integer check (min_level >= 0),
  sort_order     integer not null default 0,
  active         boolean not null default true,
  counted_at     timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  check (category <> 'brick' or color_code is not null)
);

-- every way an editor might name a color, all pointing at ONE inventory item
create table color_aliases (
  alias_type  text not null check (alias_type in ('memobrick_code', 'supplier_code', 'hex', 'name')),
  alias       text not null,
  item_id     integer not null references items(id),
  primary key (alias_type, alias)
);

create table settings (
  key    text primary key,
  value  jsonb not null
);

-- the materials one kit of each size needs, taken from the editors' SIZES
-- table and the build booklet's "What's in the box"
create table size_specs (
  size_id     text primary key,            -- "20x30"
  label       text not null,
  studs_w     integer not null,
  studs_h     integer not null,
  board_sku   text not null references items(sku),
  boards      integer not null check (boards > 0),
  tools       jsonb not null default '{}', -- {"TOOL-SEPARATOR": 1}
  source      text not null default 'editor' check (source in ('editor', 'custom')),
  updated_at  timestamptz not null default now()
);

/* ---------------------------------------------------------------- designs */
create table designs (
  id                text primary key,       -- the editor's Design ID, e.g. MB-20261011-ABCD2345 / ST-...
  source            text not null check (source in ('website', 'studio')),
  external_ref      text,                   -- Studio project id
  title             text,
  order_ref         text,                   -- order number typed in Studio, e.g. "#1042"
  customer          text,
  current_revision  integer not null default 0,
  -- website designs are public submissions; they become trusted once a
  -- signed Shopify order references them
  verified          boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create unique index designs_studio_project on designs(external_ref) where source = 'studio';

create table design_revisions (
  id            serial primary key,
  design_id     text not null references designs(id) on delete cascade,
  revision      integer not null,
  size_id       text not null,
  size_label    text not null,
  studs_w       integer not null,
  studs_h       integer not null,
  plates_w      integer not null,
  plates_h      integer not null,
  total_bricks  integer not null,
  matrix        bytea not null,             -- one byte per stud: index into palette
  palette       jsonb not null,             -- [[code, name, hex], ...] as the editor sent it
  checksum      text not null,
  editor        text,                       -- editor build that produced it
  created_at    timestamptz not null default now(),
  unique (design_id, revision),
  unique (design_id, checksum)
);

-- what one kit of this revision needs. Bricks: exact count from the matrix
-- plus the packed count (bags of 100, rounded up, per the build booklet).
create table revision_materials (
  revision_id  integer not null references design_revisions(id) on delete cascade,
  item_id      integer not null references items(id),
  exact_qty    integer not null check (exact_qty >= 0),
  packed_qty   integer not null check (packed_qty >= 0),
  primary key (revision_id, item_id)
);

/* ----------------------------------------------------------------- orders */
create table orders (
  id                  serial primary key,
  source              text not null check (source in ('shopify', 'studio')),
  shopify_order_id    bigint unique,
  shopify_updated_at  timestamptz,
  studio_project_id   text unique,
  order_name          text,                -- "#1042"
  customer            text,
  email               text,
  -- pending → reserved → in_production → packed → shipped; or cancelled
  status              text not null check (status in ('pending', 'reserved', 'in_production', 'packed', 'shipped', 'cancelled')),
  financial_status    text,
  needs_attention     text,
  materials_returned  boolean not null default false,
  -- a Studio order later matched to the customer's Shopify order is merged into it
  merged_into         integer references orders(id),
  placed_at           timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index orders_name on orders(order_name);
create index orders_status on orders(status);

create table order_lines (
  id               serial primary key,
  order_id         integer not null references orders(id) on delete cascade,
  shopify_line_id  bigint,
  design_id        text not null,
  -- pinned permanently: the revision this order is produced from
  revision_id      integer references design_revisions(id),
  quantity         integer not null check (quantity >= 0),
  title            text,
  size_label       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (order_id, shopify_line_id)
);
create index order_lines_design on order_lines(design_id);

-- the live reservation of each order, one row per item (never duplicated)
create table reservations (
  order_id  integer not null references orders(id) on delete cascade,
  item_id   integer not null references items(id),
  qty       integer not null check (qty > 0),
  primary key (order_id, item_id)
);

-- what was physically taken from stock when the order was packed
create table consumptions (
  order_id  integer not null references orders(id),
  item_id   integer not null references items(id),
  qty       integer not null check (qty > 0),
  primary key (order_id, item_id)
);

/* ------------------------------------------------------------ the ledger */
create table restocks (
  id           serial primary key,
  supplier     text,
  reference    text,
  received_at  date not null default current_date,
  notes        text,
  user_id      integer references users(id),
  created_at   timestamptz not null default now()
);
create table restock_lines (
  restock_id  integer not null references restocks(id) on delete cascade,
  item_id     integer not null references items(id),
  qty         integer not null check (qty > 0),
  primary key (restock_id, item_id)
);

-- every change to on_hand or reserved, forever
create table movements (
  id              bigserial primary key,
  item_id         integer not null references items(id),
  type            text not null check (type in ('count', 'adjust', 'restock', 'reserve', 'release', 'consume', 'return')),
  delta_on_hand   integer not null default 0,
  delta_reserved  integer not null default 0,
  on_hand_after   integer,
  reserved_after  integer not null,
  order_id        integer references orders(id),
  restock_id      integer references restocks(id),
  reason          text,
  user_id         integer references users(id),
  actor           text not null,          -- "Ana (admin)", "shopify", "studio", "system"
  created_at      timestamptz not null default now()
);
create index movements_item on movements(item_id, created_at desc);
create index movements_order on movements(order_id);
create index movements_created on movements(created_at desc);

/* ------------------------------------------------- integration plumbing */
create table webhook_events (
  id            text primary key,          -- X-Shopify-Webhook-Id (or a hash of the body)
  topic         text not null,
  shop          text,
  payload       jsonb not null,
  status        text not null default 'pending' check (status in ('pending', 'done', 'failed', 'ignored')),
  attempts      integer not null default 0,
  last_error    text,
  received_at   timestamptz not null default now(),
  processed_at  timestamptz,
  next_try_at   timestamptz not null default now()
);
create index webhook_events_pending on webhook_events(next_try_at) where status in ('pending', 'failed');

create table alerts (
  id           serial primary key,
  item_id      integer not null references items(id),
  kind         text not null check (kind in ('low_stock', 'shortage')),
  message      text not null,
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  notified_at  timestamptz
);
create unique index alerts_open on alerts(item_id, kind) where resolved_at is null;

create table error_log (
  id          bigserial primary key,
  context     text not null,
  message     text not null,
  detail      jsonb,
  created_at  timestamptz not null default now()
);

create table audit_log (
  id          bigserial primary key,
  user_id     integer references users(id),
  actor       text not null,
  action      text not null,
  entity      text,
  entity_id   text,
  detail      jsonb,
  created_at  timestamptz not null default now()
);
create index audit_log_created on audit_log(created_at desc);
