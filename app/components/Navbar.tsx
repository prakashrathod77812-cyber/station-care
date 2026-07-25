export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between">

      <h1 className="font-bold text-xl">
        Station Care
      </h1>

      <div className="space-x-4">

        <a href="/">Home</a>

        <a href="/report">
          Report
        </a>

        <a href="/volunteer">
          Volunteer
        </a>

        <a href="/ngo">
          NGO
        </a>
        
        <a href="/dashboard">
          Dashboard
        </a>





      </div>

    </nav>
  );
}