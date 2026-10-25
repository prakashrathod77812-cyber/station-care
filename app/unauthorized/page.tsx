import Link from "next/link";
import Navbar from "../components/Navbar";

export default function UnauthorizedPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-xl p-10">
        <h1 className="mb-3 text-4xl font-bold">Access denied</h1>
        <p className="mb-6 text-gray-700">This area is reserved for Station Care administrators.</p>
        <Link href="/" className="text-blue-700 underline">Return home</Link>
      </main>
    </>
  );
}
