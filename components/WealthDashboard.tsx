"use client";

import dynamic from "next/dynamic";
import { FormEvent, useMemo, useState } from "react";

const WealthCharts = dynamic(() => import("@/components/WealthCharts"), {
  ssr: false,
  loading: () => (
    <section className="border-t border-foreground/10 pt-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="h-[260px] animate-pulse rounded-lg bg-foreground/5" />
        <div className="h-[260px] animate-pulse rounded-lg bg-foreground/5" />
      </div>
    </section>
  ),
});

export const ASSET_CATEGORIES = [
  "Cash & Savings",
  "Investments",
  "Real Estate",
  "Retirement",
  "Other",
] as const;

type AssetEntry = {
  id: string;
  name: string;
  value: number;
  category: string;
};

type LiabilityEntry = {
  id: string;
  name: string;
  value: number;
};

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function parseCurrency(input: string): number {
  const cleaned = input.replace(/[$,\s]/g, "");
  if (!cleaned) return 0;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function AssetForm({
  name,
  value,
  category,
  onNameChange,
  onValueChange,
  onCategoryChange,
  onSubmit,
}: {
  name: string;
  value: string;
  category: string;
  onNameChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-sm font-medium text-foreground/70">Assets</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="e.g. Schwab Account"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="flex-1 rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. $450,000"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 sm:w-36"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="flex-1 rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            {ASSET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

function LiabilityForm({
  name,
  value,
  onNameChange,
  onValueChange,
  onSubmit,
}: {
  name: string;
  value: string;
  onNameChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-sm font-medium text-foreground/70">Liabilities</h2>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="e.g. Mortgage"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="flex-1 rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="e.g. $280,000"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 sm:w-36"
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:shrink-0"
        >
          Add
        </button>
      </div>
    </form>
  );
}

function AssetList({
  items,
  onDelete,
}: {
  items: AssetEntry[];
  onDelete: (id: string) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-foreground/40">None added yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-3 rounded-md border border-foreground/10 bg-foreground/[0.03] px-3 py-2"
        >
          <span className="min-w-0 truncate text-sm">
            <span className="text-foreground/50">{item.category} · </span>
            {item.name}
            <span className="text-foreground/50"> — </span>
            <span className="tabular-nums">{formatCurrency(item.value)}</span>
          </span>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="shrink-0 text-sm text-foreground/40 transition-colors hover:text-accent"
            aria-label={`Delete ${item.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function LiabilityList({
  items,
  onDelete,
}: {
  items: LiabilityEntry[];
  onDelete: (id: string) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-foreground/40">None added yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-3 rounded-md border border-foreground/10 bg-foreground/[0.03] px-3 py-2"
        >
          <span className="min-w-0 truncate text-sm">
            {item.name}
            <span className="text-foreground/50"> — </span>
            <span className="tabular-nums">{formatCurrency(item.value)}</span>
          </span>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="shrink-0 text-sm text-foreground/40 transition-colors hover:text-accent"
            aria-label={`Delete ${item.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function WealthDashboard() {
  const [assets, setAssets] = useState<AssetEntry[]>([]);
  const [liabilities, setLiabilities] = useState<LiabilityEntry[]>([]);
  const [assetName, setAssetName] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [assetCategory, setAssetCategory] = useState<string>(ASSET_CATEGORIES[0]);
  const [liabilityName, setLiabilityName] = useState("");
  const [liabilityValue, setLiabilityValue] = useState("");

  const savedAssetTotal = useMemo(
    () => assets.reduce((sum, a) => sum + a.value, 0),
    [assets],
  );
  const savedLiabilityTotal = useMemo(
    () => liabilities.reduce((sum, l) => sum + l.value, 0),
    [liabilities],
  );

  const netWorth = useMemo(() => {
    const assetTotal = savedAssetTotal + parseCurrency(assetValue);
    const liabilityTotal =
      savedLiabilityTotal + parseCurrency(liabilityValue);
    return assetTotal - liabilityTotal;
  }, [savedAssetTotal, savedLiabilityTotal, assetValue, liabilityValue]);

  const assetsByCategory = useMemo(() => {
    const totals = new Map<string, number>();
    for (const asset of assets) {
      totals.set(asset.category, (totals.get(asset.category) ?? 0) + asset.value);
    }
    return Array.from(totals.entries())
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [assets]);

  const addAsset = () => {
    const value = parseCurrency(assetValue);
    const name = assetName.trim();
    if (!name || value <= 0) return;
    setAssets((prev) => [
      ...prev,
      { id: newId(), name, value, category: assetCategory },
    ]);
    setAssetName("");
    setAssetValue("");
  };

  const addLiability = () => {
    const value = parseCurrency(liabilityValue);
    const name = liabilityName.trim();
    if (!name || value <= 0) return;
    setLiabilities((prev) => [...prev, { id: newId(), name, value }]);
    setLiabilityName("");
    setLiabilityValue("");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 sm:px-8">
      <div className="py-12 text-center sm:py-16">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-foreground/50">
          Net Worth
        </p>
        <p className="text-5xl font-semibold tabular-nums tracking-tight text-accent sm:text-6xl">
          {formatCurrency(netWorth)}
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <section className="min-w-0 space-y-4">
          <AssetForm
            name={assetName}
            value={assetValue}
            category={assetCategory}
            onNameChange={setAssetName}
            onValueChange={setAssetValue}
            onCategoryChange={setAssetCategory}
            onSubmit={addAsset}
          />
          <AssetList
            items={assets}
            onDelete={(id) =>
              setAssets((prev) => prev.filter((a) => a.id !== id))
            }
          />
        </section>

        <section className="min-w-0 space-y-4">
          <LiabilityForm
            name={liabilityName}
            value={liabilityValue}
            onNameChange={setLiabilityName}
            onValueChange={setLiabilityValue}
            onSubmit={addLiability}
          />
          <LiabilityList
            items={liabilities}
            onDelete={(id) =>
              setLiabilities((prev) => prev.filter((l) => l.id !== id))
            }
          />
        </section>
      </div>

      <div className="mt-12">
        <WealthCharts
          assetsByCategory={assetsByCategory}
          assetTotal={savedAssetTotal}
          liabilityTotal={savedLiabilityTotal}
        />
      </div>
    </div>
  );
}
