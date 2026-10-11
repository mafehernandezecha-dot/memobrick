/* Near-real-time updates: the dashboard keeps one Server-Sent Events
   connection open and refreshes whatever it is showing when told data
   changed. */
const clients = new Set();

export function subscribe(res){
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.write("retry: 4000\n\n");
  clients.add(res);
  const ping = setInterval(() => res.write(": ping\n\n"), 25000);
  res.on("close", () => { clearInterval(ping); clients.delete(res); });
}

let pending = new Set(), timer = null;
export function broadcast(scope){
  pending.add(scope || "all");
  if (timer) return;
  timer = setTimeout(() => {
    const data = JSON.stringify({ scopes: [...pending], at: Date.now() });
    pending = new Set(); timer = null;
    for (const res of clients) res.write(`event: changed\ndata: ${data}\n\n`);
  }, 250);
}
