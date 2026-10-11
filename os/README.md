# Memobrick OS

Tu oficina de agentes de marketing en LEGO. Corre en tu computadora.

## Abrirla

1. Instala Node.js 20 o más nuevo.
2. Conecta Claude para el chat con Betty (una vez): define `ANTHROPIC_API_KEY` en tu terminal, o corre `ant auth login`.
3. En la carpeta del repositorio:

```bash
cd os
npm install
npm run os
```

4. Abre la dirección que aparece (por ejemplo http://localhost:5173).

## De dónde salen los datos

Todo se lee de este repositorio cada vez que la app se actualiza (cada 15 segundos):

- `os/agents.json`: el equipo. Edítalo para agregar o renombrar un agente.
- `marketing/approvals/queue.md`: lo que te toca decidir. Aprobar, Editar y Rechazar escriben aquí la línea `Status:` de esa propuesta.
- `marketing/reports/`: los reportes de cada corrida (Para Eden).
- `marketing/shared/scorecard.md`: las ventas de la semana.
- `marketing/status/<agente>.json`: el estado en vivo que cada agente escribe al empezar y terminar.

Los agentes trabajan en la rama `main`. Para ver lo último, haz `git pull` en tu copia; para que vean tus decisiones, haz commit y push de `marketing/approvals/queue.md`.

Las decisiones y el chat solo funcionan desde la misma computadora donde corre la app. Las conversaciones con Betty se guardan en `os/data/chats/` (no se suben al repositorio).
