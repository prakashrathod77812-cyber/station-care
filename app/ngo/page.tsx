"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function NGOPage() {
  const [ngoName, setNgoName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [coverageArea, setCoverageArea] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ngo = {
      ngoName,
      contactPerson,
      email,
      coverageArea,
      date: new Date().toLocaleString(),
    };

    const existingNGOs =
      JSON.parse(localStorage.getItem("ngos") || "[]");

    existingNGOs.push(ngo);

    localStorage.setItem(
      "ngos",
      JSON.stringify(existingNGOs)
    );

    setMessage("✅ NGO registered successfully!");

    setNgoName("");
    setContactPerson("");
    setEmail("");
    setCoverageArea("");
  };

  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          NGO Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-4"
        >
          <input
            type="text"
            placeholder="NGO Name"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="Coverage Area"
            value={coverageArea}
            onChange={(e) => setCoverageArea(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded"
          >
            Register NGO
          </button>

          {message && (
            <p className="text-green-600 font-bold">
              {message}
            </p>
          )}
        </form>
      </main>
    </>
  );
}

