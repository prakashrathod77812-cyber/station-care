"use client";

import { useState } from "react";
import { submitReport } from "../actions";
import Navbar from "../components/Navbar";

export default function ReportPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const result = await submitReport(new FormData(event.currentTarget));
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
        <h1 className="mb-6 text-4xl font-bold">Report a Family</h1>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <input name="station" type="text" placeholder="Railway Station Name" maxLength={120} required className="w-full rounded border p-3" />
          <input name="adults" type="number" placeholder="Number of Adults" min="0" max="100" required className="w-full rounded border p-3" />
          <input name="children" type="number" placeholder="Number of Children" min="0" max="100" required className="w-full rounded border p-3" />
          <textarea name="description" placeholder="Describe the situation" rows={4} maxLength={2000} required className="w-full rounded border p-3" />
          <button type="submit" className="rounded bg-blue-700 px-6 py-3 text-white">Submit report</button>
          {message && <p className="font-bold text-green-600" aria-live="polite">{message}</p>}
          {error && <p className="font-bold text-red-600">{error}</p>}
        </form>
      </main>
    </>
  );
}
