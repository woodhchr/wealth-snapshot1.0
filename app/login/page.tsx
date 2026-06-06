import Link from "next/link";
import AuthForm from "@/components/AuthForm";

type LoginPageProps = {
  searchParams: { confirmed?: string; error?: string };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  let initialMessage: string | undefined;
  let initialError: string | undefined;

  if (searchParams.confirmed === "1") {
    initialMessage = "Email confirmed! Please sign in to continue.";
  } else if (searchParams.error === "auth_callback_failed") {
    initialError =
      "Email confirmation failed. Try signing in or sign up again.";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-1.5">
          <span className="text-lg font-medium tracking-tight text-foreground">
            Fractr
          </span>
          <span
            className="inline-block h-2 w-2 rounded-full bg-accent"
            aria-hidden="true"
          />
        </Link>

        <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-8">
          <h1 className="mb-1 text-xl font-medium text-foreground">Welcome back</h1>
          <p className="mb-6 text-sm text-foreground/60">
            Sign in to your wealth intelligence dashboard.
          </p>
          <AuthForm
            mode="login"
            initialMessage={initialMessage}
            initialError={initialError}
          />
        </div>
      </div>
    </main>
  );
}
