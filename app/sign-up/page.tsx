"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "../components/Navbar";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const passwordConfirmation = String(formData.get("passwordConfirmation") ?? "");

    if (password.length < 12) {
      setError("Choose a password with at least 12 characters.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: String(formData.get("email") ?? ""),
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm?next=/` },
    });
    setIsSubmitting(false);

    if (signUpError) {
      setError("Unable to create that account. Try another email or sign in.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Check your email to confirm your account, then sign in.");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md p-10">
        <h1 className="mb-2 text-4xl font-bold">Create account</h1>
        <p className="mb-6 text-gray-600">Your account lets us associate each submission with its sender.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block"><span className="mb-1 block">Email</span><input name="email" type="email" autoComplete="email" required className="w-full rounded border p-3" /></label>
          <label className="block"><span className="mb-1 block">Password</span><input name="password" type="password" minLength={12} autoComplete="new-password" required className="w-full rounded border p-3" /></label>
          <label className="block"><span className="mb-1 block">Confirm password</span><input name="passwordConfirmation" type="password" minLength={12} autoComplete="new-password" required className="w-full rounded border p-3" /></label>
          <button disabled={isSubmitting} className="rounded bg-blue-700 px-6 py-3 text-white disabled:opacity-60">{isSubmitting ? "Creating account…" : "Create account"}</button>
          {error && <p className="font-bold text-red-600">{error}</p>}
          {message && <p className="font-bold text-green-700">{message}</p>}
        </form>
        <p className="mt-5">Already registered? <Link className="text-blue-700 underline" href="/login">Sign in</Link>.</p>
      </main>
    </>
  );
}
