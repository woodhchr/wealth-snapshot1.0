import { signOut } from "@/app/actions/auth";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-lg border border-foreground/15 px-3 py-1.5 text-sm text-foreground/70 transition hover:border-foreground/30 hover:text-foreground"
      >
        Sign out
      </button>
    </form>
  );
}
