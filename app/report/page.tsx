"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ReportPage() {
  const [station, setStation] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const report = {
      station,
      adults,
      children,
      description,
      date: new Date().toLocaleString(),
    };

    const existingReports =
      JSON.parse(localStorage.getItem("reports") || "[]");

    existingReports.push(report);

    localStorage.setItem(
      "reports",
      JSON.stringify(existingReports)
    );

    setMessage("✅ Report submitted successfully!");

    setStation("");
    setAdults("");
    setChildren("");
    setDescription("");
  };

  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Report a Family
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-4"
        >
          <input
            type="text"
            placeholder="Railway Station Name"
            value={station}
            onChange={(e) => setStation(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            placeholder="Number of Adults"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            placeholder="Number of Children"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <textarea
            placeholder="Describe the situation"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded"
          >
            Submit Report
          </button>

          {message && (
            <p className="text-green-500 font-bold">
              {message}
            </p>
          )}
        </form>
      </main>
    </>
  );
}

