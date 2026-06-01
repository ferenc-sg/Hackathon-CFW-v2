import { redirect } from "next/navigation";
import { getSelf } from "@/lib/session";
import { signIn } from "@/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const self = await getSelf();
  if (self) redirect("/");

  const { error } = await searchParams;

  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="card w-full max-w-sm p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">
          CF
        </div>
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Career Framework</h1>
        <p className="mt-1 text-sm text-slate-500">saas.group · CFMS</p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error === "AccessDenied"
              ? "That account isn't provisioned for the CFMS. Ask an HR/Admin to add you, then try again."
              : "Sign-in failed. Please try again."}
          </div>
        )}

        <form action={signInWithGoogle} className="mt-6">
          <button type="submit" className="btn-secondary w-full justify-center py-2.5">
            <GoogleIcon />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-400">
          Access is restricted to provisioned saas.group accounts.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}
