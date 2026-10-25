"use client";

import { useState } from "react";
import { registerNgo } from "../actions";
import Navbar from "../components/Navbar";

export default function NGOPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const result = await registerNgo(new FormData(event.currentTarget));

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
        <h1 className="mb-6 text-4xl font-bold">NGO Registration</h1>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <input name="ngoName" type="text" placeholder="NGO Name" maxLength={160} required className="w-full rounded border p-3" />
          <input name="contactPerson" type="text" placeholder="Contact Person" maxLength={120} required className="w-full rounded border p-3" />
          <input name="email" type="email" placeholder="Email Address" maxLength={254} required className="w-full rounded border p-3" />
          <input name="coverageArea" type="text" placeholder="Coverage Area" maxLength={240} required className="w-full rounded border p-3" />
          <button type="submit" className="rounded bg-blue-700 px-6 py-3 text-white">Register NGO</button>
          {message && <p className="font-bold text-green-600" aria-live="polite">{message}</p>}
          {error && <p className="font-bold text-red-600">{error}</p>}
        </form>
      </main>
    </>
  );
}
