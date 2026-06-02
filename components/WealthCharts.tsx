"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCENT = "#e05c3a";
const CHART_COLORS = [
  "#e05c3a",
  "#f07a5c",
  "#c44e32",
  "#ff9a7a",
  "#a84830",
  "#8a3d28",
];

const TOOLTIP_STYLE = {
  backgroundColor: "#12141a",
  border: "1px solid rgba(240, 237, 232, 0.1)",
  borderRadius: "6px",
  color: "#f0ede8",
};

const AXIS_TICK = { fill: "#f0ede8", fontSize: 12, opacity: 0.7 };

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTooltipValue(value: unknown): string {
  return formatCurrency(typeof value === "number" ? value : 0);
}

type CategorySlice = {
  name: string;
  value: number;
};

type ComparisonBar = {
  name: string;
  value: number;
  fill: string;
};

function ChartShell({ children }: { children: React.ReactNode }) {
  return <div className="chart-container">{children}</div>;
}

export default function WealthCharts({
  assetsByCategory,
  assetTotal,
  liabilityTotal,
}: {
  assetsByCategory: CategorySlice[];
  assetTotal: number;
  liabilityTotal: number;
}) {
  const comparisonData: ComparisonBar[] = [
    { name: "Assets", value: assetTotal, fill: ACCENT },
    { name: "Liabilities", value: liabilityTotal, fill: "rgba(240, 237, 232, 0.35)" },
  ];

  const hasAssetData = assetsByCategory.length > 0;
  const hasComparisonData = assetTotal > 0 || liabilityTotal > 0;

  return (
    <section className="border-t border-foreground/10 pt-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="mb-4 text-center text-sm font-medium text-foreground/70">
            Assets by Category
          </h3>
          {hasAssetData ? (
            <ChartShell>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={assetsByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    stroke="#08090a"
                    strokeWidth={2}
                  >
                    {assetsByCategory.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={formatTooltipValue}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartShell>
          ) : (
            <p className="flex h-[260px] items-center justify-center text-sm text-foreground/40">
              Add assets to see category breakdown
            </p>
          )}
          {hasAssetData && (
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {assetsByCategory.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-center gap-1.5 text-xs text-foreground/60"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  />
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="mb-4 text-center text-sm font-medium text-foreground/70">
            Assets vs Liabilities
          </h3>
          {hasComparisonData ? (
            <ChartShell>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={AXIS_TICK}
                  />
                  <YAxis
                    width={48}
                    axisLine={false}
                    tickLine={false}
                    tick={{ ...AXIS_TICK, fontSize: 11, opacity: 0.5 }}
                    tickFormatter={(v) =>
                      v >= 1_000_000
                        ? `$${(v / 1_000_000).toFixed(1)}M`
                        : v >= 1_000
                          ? `$${(v / 1_000).toFixed(0)}k`
                          : `$${v}`
                    }
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={formatTooltipValue}
                    cursor={{ fill: "rgba(240, 237, 232, 0.05)" }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={80}>
                    {comparisonData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartShell>
          ) : (
            <p className="flex h-[260px] items-center justify-center text-sm text-foreground/40">
              Add assets or liabilities to compare
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
