"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const [reportCount, setReportCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [ngoCount, setNgoCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    const reports =
      JSON.parse(localStorage.getItem("reports") || "[]");

    const volunteers =
      JSON.parse(localStorage.getItem("volunteers") || "[]");

    const ngos =
      JSON.parse(localStorage.getItem("ngos") || "[]");

    setReportCount(reports.length);
    setVolunteerCount(volunteers.length);
    setNgoCount(ngos.length);

    let totalChildren = 0;

    reports.forEach((report: any) => {
      totalChildren += Number(report.children || 0);
    });

    setChildrenCount(totalChildren);

  }, []);

  return (
    <>
      <Navbar />

      <main className="p-10">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h2 className="text-3xl font-bold">
              {reportCount}
            </h2>
            <p>Families Reported</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-lg">
            <h2 className="text-3xl font-bold">
              {childrenCount}
            </h2>
            <p>Children Identified</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-lg">
            <h2 className="text-3xl font-bold">
              {ngoCount}
            </h2>
            <p>NGOs Registered</p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-lg">
            <h2 className="text-3xl font-bold">
              {volunteerCount}
            </h2>
            <p>Volunteers Registered</p>
          </div>

        </div>

      </main>
    </>
  );
}

