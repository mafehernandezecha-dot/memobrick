/* Tiny routing / request helpers on top of node:http (no framework). */
export class HttpError extends Error {
  constructor(status, message, detail){ super(message); this.status = status; this.detail = detail; }
}

export function router(){
  const routes = [];
  const add = (method) => (pattern, ...handlers) => {
    const keys = [];
    const re = new RegExp("^" + pattern.replace(/:([a-zA-Z]+)/g, (_, k) => { keys.push(k); return "([^/]+)"; }) + "/?$");
    routes.push({ method, re, keys, handlers });
  };
  return {
    get: add("GET"), post: add("POST"), put: add("PUT"), patch: add("PATCH"), del: add("DELETE"),
    match(method, path){
      for (const r of routes){
        if (r.method !== method) continue;
        const m = r.re.exec(path);
        if (m) return { handlers: r.handlers, params: Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])])) };
      }
      return null;
    },
  };
}

export function readBody(req, limit){
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit){ reject(new HttpError(413, "Request too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export function send(res, status, body, headers = {}){
  if (res.headersSent) return;
  const isText = typeof body === "string" || Buffer.isBuffer(body);
  res.writeHead(status, { "Content-Type": isText ? "text/plain; charset=utf-8" : "application/json; charset=utf-8", ...headers });
  res.end(isText ? body : JSON.stringify(body));
}

/* CSV that opens cleanly in Excel / Google Sheets */
export function toCSV(rows, columns){
  const esc = (v) => {
    if (v == null) return "";
    let s = String(v);
    if (/^[=+\-@]/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) s = "'" + s;   // no formula injection
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [columns.map((c) => esc(c.label)).join(","), ...rows.map((r) => columns.map((c) => esc(typeof c.value === "function" ? c.value(r) : r[c.key])).join(","))].join("\r\n") + "\r\n";
}

export function parseCSV(text){
  const rows = []; let row = [], field = "", q = false;
  const s = String(text).replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++){
    const ch = s[i];
    if (q){
      if (ch === '"' && s[i + 1] === '"'){ field += '"'; i++; }
      else if (ch === '"') q = false;
      else field += ch;
    } else if (ch === '"') q = true;
    else if (ch === ","){ row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r"){
      if (ch === "\r" && s[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  return rows;
}
