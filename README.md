# Wealth Snapshot

A single-page net worth dashboard built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Fix for `404: NOT_FOUND` on deploy

That error almost always means Vercel is building the **wrong folder** or has a bad **Output Directory** setting.

In your Vercel project → **Settings** → **General**:

| Setting | Value |
|--------|--------|
| **Root Directory** | `.` if this repo *is* `wealth-snapshot` (you see `package.json` at the top). Use `wealth-snapshot` only if the repo root is the parent `fractr` folder. |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | **Leave empty** — do not set `.next`, `out`, or `public` |
| **Install Command** | `npm install` (default) |

Then **Deployments** → open the latest deployment → **Redeploy**.

### Option A: Vercel Dashboard (recommended)

1. Push this project to a GitHub repository (repo root should contain `package.json` and `app/`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Confirm **Root Directory** as above, then click **Deploy**.

Your live URL will look like `https://wealth-snapshot-xxx.vercel.app`.

### Option B: Vercel CLI

```bash
npm i -g vercel
cd wealth-snapshot
vercel
```

Follow the prompts to link a Vercel account and project. Run `vercel --prod` for a production deployment.

## Project structure

- `app/` — App Router pages and global styles
- `components/WealthDashboard.tsx` — forms, lists, net worth
- `components/WealthCharts.tsx` — donut (assets by category) and bar (assets vs liabilities) charts
