"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";

type AuthFormProps = {
  mode: "login" | "signup";
  initialMessage?: string;
  initialError?: string;
};

export default function AuthForm({
  mode,
  initialMessage,
  initialError,
}: AuthFormProps) {
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setMessage(null);
    setLoading(true);

    const result =
      mode === "login"
        ? await signIn({}, formData)
        : await signUp({}, formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.message) {
      setMessage(result.message);
    }

    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-foreground/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm text-foreground/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {message && (
        <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-foreground">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-background transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-sm text-foreground/60">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
