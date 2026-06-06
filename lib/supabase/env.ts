function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Add it to .env.local (see .env.local.example).`
    );
  }
  return value;
}

export function getSupabaseConfig() {
  return {
    url: getEnv("SUPABASE_URL"),
    anonKey: getEnv("SUPABASE_ANON_KEY"),
  };
}

export function getSiteUrl() {
  return process.env.SITE_URL ?? "http://localhost:3000";
}
