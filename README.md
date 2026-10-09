# funktion.work

The funktion website. Next.js (App Router), one static page, no backend.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where things live

- `components/Home.tsx` the homepage: folder tabs, f(word) headline, chaos → f(*) → workflow diagram, services folders, how we work, shipped band, current funktions, footer.
- `components/useFixMorph.ts` the footer tangle that pulls straight into the workflow (hover on desktop, scroll on phones).
- `app/globals.css` all styles, colors per folder tab (`.fx-root[data-theme=...]`), animations.
- `public/brand/` wordmark, f(*) marks, paper grain.
- `app/icon.png`, `app/apple-icon.png` browser and home-screen icons.

## Deploy (Vercel + funktion.work)

1. In Vercel: **Add New → Project → Import** `funktion-llc/funktion-site`. Defaults are fine. Deploy.
2. In the project: **Settings → Domains → Add** `funktion.work` (and `www.funktion.work`, redirecting to the apex).
3. Vercel shows the DNS records to add. At your domain registrar, add them:
   - `A` record for `@` pointing to the IP Vercel shows
   - `CNAME` for `www` pointing to the value Vercel shows
4. Wait for the domain to show as valid in Vercel (minutes to a few hours). HTTPS is automatic.

Every push to `main` redeploys.

## Still placeholder

- `[email]` and `linkedin` links in the footer
- "book a working session" buttons (point to a booking page)
- OUTIN screenshot and details, client cases f(02), f(03)
