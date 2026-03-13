# Touch Base — BASE.dev mini-app

A Base-first Farcaster mini-app prepared for BASE.dev registration. The project exposes a shareable mini-app URL, a JSON manifest, and environment-driven Builder Code + payout address fields so attribution works out of the box.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## BASE.dev integration

- **Mini-app URL:** `/miniapp` (derived from `NEXT_PUBLIC_APP_URL`, defaults to `http://localhost:3000/miniapp`)
- **Manifest endpoint:** `/api/miniapp` surfaces the registration payload BASE.dev needs
- **Docs index:** https://docs.base.org/llms.txt (linked in the manifest)

### Environment

Set these in `.env.local` (values are optional but recommended):

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.xyz
NEXT_PUBLIC_BASE_MINIAPP_PATH=/miniapp
NEXT_PUBLIC_BASE_BUILDER_CODE=abc123      # from base.dev → Settings
NEXT_PUBLIC_BASE_PAYOUT_ADDRESS=0x...     # where rewards should land
NEXT_PUBLIC_SUPPORT_EMAIL=support@touch-base.app
```

### Registration steps

1. Visit `/miniapp` (or the absolute URL above) and paste it into the BASE.dev registration form.
2. Add your issued Builder Code and payout address via the env vars so they render in the UI and manifest.
3. Confirm attribution using the Builder Code Validation tool or a block explorer to verify the ERC-8021 suffix.

## Scripts

- `npm run dev` — start the dev server
- `npm run lint` — run ESLint
- `npm run build` — production build check
