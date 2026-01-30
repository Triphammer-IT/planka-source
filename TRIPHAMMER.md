# Triphammer – Clean Fork

This repo (**Triphammer-IT/planka-source**) is the **clean fork** of Planka. Use it for all new development (including future color-picker work). Code here is not taken from **Triphammer-IT/planka** main (the deploy repo) so we avoid the tainted color-picker history that caused login/spinner issues.

## Remotes (this workspace)

- **source** → `Triphammer-IT/planka-source` (this repo; clean fork)
- **fork** → `Triphammer-IT/planka` (deploy repo; unchanged for stability)
- **origin** → `plankanban/planka` (upstream)

## Our features

- **our-features** branch: drop-anywhere-in-column + collapsible lists, applied from **dev branches only** (`fix/collapsed-bar-narrow`), not from planka@main.

## Build-dev

Run Planka from this repo (clone `planka-source`, checkout `our-features`, then `npm install`, `server/.env`, `npm run server:db:init`, `npm start` with `VITE_SERVER_BASE_URL` set). See `_investigate-services-dev/planka/README.md` for dev client notes.

## Deploy

The **deploy** repo remains **Triphammer-IT/planka** (docker-dev). No change there; this fork is for clean development only.
