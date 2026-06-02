import WealthDashboard from "@/components/WealthDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10 px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          My Wealth Snapshot
          <span
            className="ml-1.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-accent"
            aria-hidden="true"
          />
        </h1>
      </header>
      <WealthDashboard />
    </main>
  );
}
