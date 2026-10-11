// The Memobrick office floor plan, in studs (1 stud = 0.8 scene units).
// x grows to the right, z grows toward the camera. Rooms follow the show's
// names ("Oficina de Mario Calderón" style) and hold Memobrick departments.

export type Side = 'n' | 's' | 'e' | 'w';
export type Floor = 'tile' | 'wood' | 'carpet' | 'red';

export type Furniture =
  | 'conference'
  | 'sofa'
  | 'bookshelf'
  | 'cabinet'
  | 'plant'
  | 'rug'
  | 'counter'
  | 'shelves'
  | 'boxes'
  | 'mannequin'
  | 'rack'
  | 'whiteboard'
  | 'bigdesk';

export type Room = {
  id: string;
  label: string;
  icon: string;
  x: number;
  z: number;
  w: number;
  d: number;
  floor: Floor;
  /** Openings in this room's walls: side, offset from the room's corner, width. */
  doors: { side: Side; at: number; width: number }[];
  /** Characters (agents.json "character") who sit here, in seat order. */
  cast: string[];
  /** Desk seats relative to the room corner, in studs. Figures stand behind the desk facing the camera. */
  seats: { x: number; z: number }[];
  furniture: { kind: Furniture; x: number; z: number; rot?: number }[];
};

export const OFFICE = { w: 64, d: 44 };

export const ROOMS: Room[] = [
  {
    id: 'taller',
    label: 'Taller de Hugo Lombardi',
    icon: '✂️',
    x: 0, z: 4, w: 16, d: 14,
    floor: 'wood',
    doors: [{ side: 's', at: 10, width: 4 }],
    cast: ['hugo', 'freddy', 'patricia'],
    seats: [{ x: 4, z: 5 }, { x: 11, z: 5 }, { x: 4, z: 10 }],
    furniture: [
      { kind: 'mannequin', x: 12, z: 10 },
      { kind: 'rack', x: 8, z: 1.5 },
      { kind: 'plant', x: 1.5, z: 12.5 },
    ],
  },
  {
    id: 'cuartel',
    label: 'El cuartel de las feas',
    icon: '💬',
    x: 16, z: 2, w: 14, d: 16,
    floor: 'tile',
    doors: [{ side: 's', at: 5, width: 4 }],
    cast: ['mariana', 'sandra', 'inesita'],
    seats: [{ x: 3.5, z: 5 }, { x: 10, z: 5 }, { x: 3.5, z: 11 }],
    furniture: [
      { kind: 'cabinet', x: 12.5, z: 1.5 },
      { kind: 'cabinet', x: 10.5, z: 1.5 },
      { kind: 'plant', x: 12.5, z: 13.5 },
      { kind: 'bookshelf', x: 6, z: 1.2 },
    ],
  },
  {
    id: 'entrada',
    label: 'La entrada',
    icon: '🚪',
    x: 30, z: 0, w: 8, d: 10,
    floor: 'tile',
    doors: [{ side: 'n', at: 2, width: 4 }, { side: 's', at: 2, width: 4 }],
    cast: ['wilson'],
    seats: [{ x: 6, z: 6 }],
    furniture: [{ kind: 'plant', x: 1.5, z: 1.8 }],
  },
  {
    id: 'recepcion',
    label: 'Recepción',
    icon: '🛎️',
    x: 38, z: 0, w: 12, d: 14,
    floor: 'tile',
    doors: [{ side: 'w', at: 3, width: 4 }, { side: 's', at: 4, width: 4 }],
    cast: ['sofia', 'margarita', 'jenny'],
    seats: [{ x: 4, z: 4 }, { x: 9, z: 4 }, { x: 9, z: 9 }],
    furniture: [
      { kind: 'sofa', x: 3.5, z: 10.5 },
      { kind: 'rug', x: 3.5, z: 9 },
      { kind: 'plant', x: 10.5, z: 12.5 },
    ],
  },
  {
    id: 'marcela',
    label: 'Oficina de Marcela Valencia',
    icon: '✉️',
    x: 50, z: 4, w: 14, d: 14,
    floor: 'carpet',
    doors: [{ side: 's', at: 2, width: 4 }],
    cast: ['marcela', 'auramaria'],
    seats: [{ x: 5, z: 5 }, { x: 10.5, z: 8 }],
    furniture: [
      { kind: 'sofa', x: 9, z: 12 },
      { kind: 'bookshelf', x: 11, z: 1.2 },
      { kind: 'plant', x: 1.5, z: 1.8 },
    ],
  },
  {
    id: 'presidencia',
    label: 'Presidencia',
    icon: '👔',
    x: 0, z: 25, w: 14, d: 15,
    floor: 'wood',
    doors: [{ side: 'n', at: 8, width: 4 }, { side: 'e', at: 11, width: 3 }],
    cast: ['armando'],
    seats: [{ x: 6, z: 6 }],
    furniture: [
      { kind: 'bookshelf', x: 4, z: 1.2 },
      { kind: 'rug', x: 6, z: 9 },
      { kind: 'sofa', x: 6, z: 12.6 },
      { kind: 'plant', x: 1.5, z: 13.3 },
      { kind: 'plant', x: 12.5, z: 1.8 },
    ],
  },
  {
    id: 'betty',
    label: 'El cuarto de Betty',
    icon: '📒',
    x: 14, z: 35, w: 6, d: 9,
    floor: 'tile',
    doors: [{ side: 'w', at: 0, width: 3 }],
    cast: ['betty'],
    seats: [{ x: 3, z: 4.5 }],
    furniture: [{ kind: 'cabinet', x: 4.6, z: 7.5 }],
  },
  {
    id: 'juntas',
    label: 'Sala de juntas',
    icon: '🗂️',
    x: 20, z: 25, w: 18, d: 17,
    floor: 'red',
    doors: [{ side: 'n', at: 7, width: 4 }],
    cast: [],
    seats: [],
    furniture: [
      { kind: 'conference', x: 9, z: 9 },
      { kind: 'whiteboard', x: 9, z: 1 },
      { kind: 'plant', x: 1.5, z: 15.3 },
      { kind: 'plant', x: 16.5, z: 15.3 },
    ],
  },
  {
    id: 'mario',
    label: 'Oficina de Mario Calderón',
    icon: '📣',
    x: 38, z: 25, w: 14, d: 17,
    floor: 'tile',
    doors: [{ side: 'n', at: 2, width: 4 }],
    cast: ['mario', 'bertha', 'mariabeatriz', 'roberto'],
    seats: [{ x: 4, z: 6 }, { x: 10.5, z: 6 }, { x: 4, z: 12 }, { x: 10.5, z: 12 }],
    furniture: [
      { kind: 'bookshelf', x: 10, z: 1.2 },
      { kind: 'plant', x: 12.5, z: 15.3 },
    ],
  },
  {
    id: 'finanzas',
    label: 'Finanzas de Nicolás Mora',
    icon: '📊',
    x: 52, z: 25, w: 12, d: 11,
    floor: 'tile',
    doors: [{ side: 'n', at: 2, width: 4 }],
    cast: ['nicolas', 'daniel'],
    seats: [{ x: 3.5, z: 5 }, { x: 8.5, z: 5 }],
    furniture: [
      { kind: 'cabinet', x: 10.5, z: 9 },
      { kind: 'whiteboard', x: 7, z: 1 },
    ],
  },
  {
    id: 'bodega',
    label: 'Bodega y despacho',
    icon: '📦',
    x: 52, z: 36, w: 12, d: 8,
    floor: 'tile',
    doors: [{ side: 'w', at: 2, width: 3 }],
    cast: ['efrain', 'saul'],
    seats: [{ x: 3.5, z: 3.5 }, { x: 8.5, z: 3.5 }],
    furniture: [
      { kind: 'shelves', x: 6, z: 1.2 },
      { kind: 'boxes', x: 10.5, z: 6.5 },
    ],
  },
];

/** Overflow seats in the Sala de juntas for agents added later without a room. */
export const OVERFLOW_SEATS = [
  { x: 4, z: 4 }, { x: 14, z: 4 }, { x: 4, z: 14 }, { x: 14, z: 14 },
  { x: 2.5, z: 9 }, { x: 15.5, z: 9 },
];

export type Placement = { roomId: string; x: number; z: number };

/**
 * Places every agent (by character) at a desk. Characters listed in a room's
 * cast take that room's seats in order; anyone else goes to the overflow seats.
 * Returns placements keyed by character.
 */
export function placeAgents(characters: string[]): Map<string, Placement> {
  const out = new Map<string, Placement>();
  const overflow: string[] = [];
  for (const ch of characters) {
    const room = ROOMS.find((r) => r.cast.includes(ch));
    const seatIndex = room ? room.cast.indexOf(ch) : -1;
    if (room && room.seats[seatIndex]) {
      const s = room.seats[seatIndex];
      out.set(ch, { roomId: room.id, x: room.x + s.x, z: room.z + s.z });
    } else {
      overflow.push(ch);
    }
  }
  const juntas = ROOMS.find((r) => r.id === 'juntas')!;
  overflow.forEach((ch, i) => {
    const s = OVERFLOW_SEATS[i % OVERFLOW_SEATS.length];
    out.set(ch, { roomId: juntas.id, x: juntas.x + s.x, z: juntas.z + s.z });
  });
  return out;
}
