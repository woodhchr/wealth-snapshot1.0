import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-foreground/10 px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-medium tracking-tight text-foreground">
              Fractr
            </span>
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent"
              aria-hidden="true"
            />
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-foreground/70 transition hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-background transition hover:bg-accent/90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-accent">
          Wealth intelligence platform
        </p>
        <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          See your complete financial picture
        </h1>
        <p className="mt-4 max-w-lg text-base text-foreground/60">
          Track assets, liabilities, and net worth in one place. Fractr gives you
          clarity on your wealth so you can make smarter decisions.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition hover:bg-accent/90"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-foreground/15 px-6 py-3 text-sm text-foreground/80 transition hover:border-foreground/30 hover:text-foreground"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
