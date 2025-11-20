import { Link } from "react-router-dom";
import { BugAntIcon, ClipboardDocumentCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">

      {/* Navbar */}
      <header className="w-full py-5 px-8 flex items-center justify-between bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">BugTracker</h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 mt-20">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
          Track Bugs.  
          <span className="text-blue-600"> Boost Productivity.</span>
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mb-10">
          BugTracker helps teams report issues, assign tasks, monitor status,
          and resolve bugs faster—all in one clean interface.
        </p>

        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started →  
        </Link>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">

          {/* Card 1 */}
          <div className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg transition text-center">
            <BugAntIcon className="h-14 w-14 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Report Bugs Fast</h3>
            <p className="text-gray-600 mt-2">
              Submit detailed bug reports with title, description, and status controls.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg transition text-center">
            <ClipboardDocumentCheckIcon className="h-14 w-14 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Track Progress</h3>
            <p className="text-gray-600 mt-2">
              Easily visualize bugs across Open, In Progress, and Resolved stages.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg transition text-center">
            <UserGroupIcon className="h-14 w-14 mx-auto text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Team Collaboration</h3>
            <p className="text-gray-600 mt-2">
              Work together with your team to squash bugs quickly and efficiently.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BugTracker • All Rights Reserved
      </footer>
    </div>
  );
}
