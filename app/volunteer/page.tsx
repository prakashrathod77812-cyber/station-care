"use client";

import { useState } from "react";
import { registerVolunteer } from "../actions";
import Navbar from "../components/Navbar";

export default function VolunteerPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const result = await registerVolunteer(new FormData(event.currentTarget));

    if ("error" in result) {
      setError(result.error);
      return;
    }

    event.currentTarget.reset();
    setMessage(result.success);
  }

  return (
    <>
      <Navbar />
      <main className="p-10">
        <h1 className="mb-6 text-4xl font-bold">Volunteer Registration</h1>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <input name="name" type="text" placeholder="Full Name" maxLength={120} required className="w-full rounded border p-3" />
          <input name="email" type="email" placeholder="Email Address" maxLength={254} required className="w-full rounded border p-3" />
          <input name="phone" type="tel" placeholder="Phone Number" maxLength={32} required className="w-full rounded border p-3" />
          <input name="city" type="text" placeholder="City" maxLength={120} required className="w-full rounded border p-3" />
          <textarea name="reason" rows={4} placeholder="Why do you want to volunteer?" maxLength={2000} required className="w-full rounded border p-3" />
          <button type="submit" className="rounded bg-green-600 px-6 py-3 text-white">Register</button>
          {message && <p className="font-bold text-green-600" aria-live="polite">{message}</p>}
          {error && <p className="font-bold text-red-600">{error}</p>}
        </form>
      </main>
    </>
  );
}
