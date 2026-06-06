"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/supabase/env";
import type { AuthState } from "@/types/auth";

export type { AuthState };

function isNextRedirect(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    String((err as { digest: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

function formatAuthError(message: string): string {
  if (message.toLowerCase().includes("rate limit")) {
    return "Email rate limit reached — Supabase caps confirmation emails on the free tier. Wait about an hour, or disable “Confirm email” under Supabase → Authentication → Providers → Email for local dev. If you already signed up, try signing in instead.";
  }
  if (message.toLowerCase().includes("already registered")) {
    return "An account with this email already exists. Try signing in.";
  }
  return message;
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      return { error: formatAuthError(error.message) };
    }

    redirect("/dashboard");
  } catch (err) {
    if (isNextRedirect(err)) throw err;
    const message =
      err instanceof Error ? err.message : "Something went wrong. Try again.";
    return { error: formatAuthError(message) };
  }
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      },
    });

    if (error) {
      return { error: formatAuthError(error.message) };
    }

    if (data.session) {
      redirect("/dashboard");
    }

    return {
      message: "Check your email to confirm your account, then sign in.",
    };
  } catch (err) {
    if (isNextRedirect(err)) throw err;
    const message =
      err instanceof Error ? err.message : "Something went wrong. Try again.";
    return { error: formatAuthError(message) };
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
