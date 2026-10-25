"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    setIsSubmitting(false);

    if (signInError) {
      setError("Unable to sign in with those credentials.");
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/");
    router.refresh();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md p-10">
        <h1 className="mb-2 text-4xl font-bold">Sign in</h1>
        <p className="mb-6 text-gray-600">Use your Station Care account to submit information.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block"><span className="mb-1 block">Email</span><input name="email" type="email" autoComplete="email" required className="w-full rounded border p-3" /></label>
          <label className="block"><span className="mb-1 block">Password</span><input name="password" type="password" autoComplete="current-password" required className="w-full rounded border p-3" /></label>
          <button disabled={isSubmitting} className="rounded bg-blue-700 px-6 py-3 text-white disabled:opacity-60">{isSubmitting ? "Signing in…" : "Sign in"}</button>
          {error && <p className="font-bold text-red-600">{error}</p>}
        </form>
        <p className="mt-5">Need an account? <Link className="text-blue-700 underline" href="/sign-up">Create one</Link>.</p>
      </main>
    </>
  );
}
