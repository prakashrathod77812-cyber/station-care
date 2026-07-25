import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Navbar />

      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h1 className="text-5xl font-bold mb-4">
          Station Care
        </h1>

        <p className="text-xl">
          Connecting homeless families at railway stations
          with NGOs and opportunities.
        </p>

        <a
          href="/report"
          className="inline-block mt-6 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Report a Family
        </a>
      </section>

      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">

          <div className="shadow-lg p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-blue-700">
              1250+
            </h3>
            <p>Families Identified</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-green-700">
              850+
            </h3>
            <p>Children Educated</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-yellow-600">
              50+
            </h3>
            <p>Partner NGOs</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-red-600">
              2000+
            </h3>
            <p>Volunteers</p>
          </div>

        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Our Mission
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

          <div className="border p-6 rounded-lg">
            🏠 Shelter
          </div>

          <div className="border p-6 rounded-lg">
            🎓 Education
          </div>

          <div className="border p-6 rounded-lg">
            🤝 NGO Support
          </div>

        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center p-4">
        © 2026 Station Care
      </footer>

    </main>
  );
}

