import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "../components/Navbar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: claimsResponse } = await supabase.auth.getClaims();
  const claims = claimsResponse?.claims;

  if (!claims?.sub) redirect("/login?next=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", claims.sub)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/unauthorized");

  const [reportsResult, volunteersResult, ngosResult] = await Promise.all([
    supabase.from("reports").select("children"),
    supabase.from("volunteer_applications").select("id"),
    supabase.from("ngo_applications").select("id"),
  ]);

  const reports = reportsResult.data ?? [];
  const childrenCount = reports.reduce((total, report) => total + Number(report.children ?? 0), 0);
  const metrics = [
    { label: "Families Reported", value: reports.length, color: "bg-blue-600" },
    { label: "Children Identified", value: childrenCount, color: "bg-green-600" },
    { label: "NGOs Registered", value: ngosResult.data?.length ?? 0, color: "bg-yellow-500" },
    { label: "Volunteers Registered", value: volunteersResult.data?.length ?? 0, color: "bg-red-600" },
  ];

  return (
    <>
      <Navbar />
      <main className="p-10">
        <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
        <p className="mb-8 text-gray-600">Counts are available only to administrators.</p>
        <div className="grid gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className={`${metric.color} rounded-lg p-6 text-white`}>
              <h2 className="text-3xl font-bold">{metric.value}</h2>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
