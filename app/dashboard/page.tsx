import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import WealthDashboard from "@/components/WealthDashboard";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10 px-6 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Wealth Dashboard
              <span
                className="ml-1.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-accent"
                aria-hidden="true"
              />
            </h1>
            <p className="mt-1 text-sm text-foreground/50">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </header>
      <WealthDashboard />
    </main>
  );
}
