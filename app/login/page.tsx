import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { getSelf } from "@/lib/session";
import { signIn } from "@/auth";

// Auth.js sign-in error codes → human-readable guidance.
const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: "Invalid email or password. Please try again.",
  Configuration:
    "Sign-in isn't configured on the server yet. An admin needs to set AUTH_SECRET (and AUTH_TRUST_HOST) in the deployment.",
  Default: "Sign-in failed. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const self = await getSelf();
  if (self) redirect("/");

  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    try {
      await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (err) {
      // Invalid credentials → Auth.js throws; redirect back with an error code.
      if (err instanceof AuthError) redirect("/login?error=CredentialsSignin");
      throw err; // re-throw the success redirect (NEXT_REDIRECT)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="card w-full max-w-sm p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">
            CF
          </div>
          <h1 className="mt-4 text-lg font-semibold text-slate-900">Career Framework</h1>
          <p className="mt-1 text-sm text-slate-500">saas.group · CFMS</p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default}
          </div>
        )}

        <form action={login} className="mt-6 space-y-3">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input mt-1"
              placeholder="you@saas.group"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input mt-1"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-2.5">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Accounts are provisioned by an HR/Admin. Single sign-on is coming later.
        </p>
      </div>
    </div>
  );
}
