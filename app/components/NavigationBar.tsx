"use client";

import Link from "next/link";


export default function NavigationBar() {
  return (
    <nav className="bg-gray-800 p-4 flex items-center space-x-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-3xl">🐾</span>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/" className="text-white hover:text-gray-300">Home</Link>
        <Link href="/spy-cats/" className="text-white hover:text-gray-300">Spy Cats</Link>
        <Link href="/missions/" className="text-white hover:text-gray-300">Missions</Link>
      </div>
    </nav>
  );
}