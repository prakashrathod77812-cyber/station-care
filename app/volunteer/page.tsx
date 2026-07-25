"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const volunteer = {
      name,
      email,
      phone,
      city,
      reason,
      date: new Date().toLocaleString(),
    };

    const existingVolunteers =
      JSON.parse(localStorage.getItem("volunteers") || "[]");

    existingVolunteers.push(volunteer);

    localStorage.setItem(
      "volunteers",
      JSON.stringify(existingVolunteers)
    );

    setMessage("✅ Volunteer registered successfully!");

    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setReason("");
  };

  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Volunteer Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <textarea
            rows={4}
            placeholder="Why do you want to volunteer?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Register
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

