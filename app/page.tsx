import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-6xl font-extrabold text-blue-400 mb-4">
          🐱 The Spy Cat Agency 🐱
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Welcome to the HQ of the fluffiest, stealthiest, and most-lethal agents in history! This portal will help you keep a paw on the pulse of all missions and... salaries.
        </p>

        <nav className="bg-gray-800 p-6 rounded-lg shadow-xl inline-block">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/spy-cats" 
                className="flex items-center gap-3 text-blue-200 hover:text-blue-400 transition-colors duration-200 ease-in-out text-xl font-medium"
              >
                <span className="text-2xl">🐾</span> Manage Spy Cats
              </Link>
            </li>
            <li>
              <Link 
                href="/missions" 
                className="flex items-center gap-3 text-blue-200 hover:text-blue-400 transition-colors duration-200 ease-in-out text-xl font-medium"
              >
                <span className="text-2xl">🎯</span> View Missions
              </Link>
            </li>
            <li>
              <Link 
                href="/spy-cats/create" 
                className="flex items-center gap-3 text-blue-200 hover:text-blue-400 transition-colors duration-200 ease-in-out text-xl font-medium"
              >
                <span className="text-2xl">➕</span> Recruit a New Agent
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-gray-500 mt-8">
          Disclaimer: We are not responsible for any sudden elevator ambushes or forgetfulness caused by catnip.
        </p>
      </div>
    </main>
  );
}