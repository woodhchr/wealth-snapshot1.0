# Wealth Snapshot

A single-page net worth dashboard built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A: Vercel Dashboard (recommended)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set the **Root Directory** to `wealth-snapshot` if the repo root is the parent `fractr` folder; otherwise leave it as `.`.
4. Vercel auto-detects Next.js — click **Deploy**.

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
