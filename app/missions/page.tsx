"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MissionsAPI, Mission } from "@/lib/missions/api";

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = new MissionsAPI();

    async function fetchMissions() {
      try {
        const data = await api.getAll();
        setMissions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Failed to fetch missions:", err.message);
          setError(err.message);
        } else {
          console.error("Failed to fetch missions:", err);
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMissions();
  }, []);

  if (loading) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading missions...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-400">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-blue-400">🎯 Missions</h1>
        <Link
          href="/missions/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
        >
          ➕ Create Mission
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {missions.length === 0 ? (
          <p className="text-gray-400 text-center text-lg py-8">No missions found. Time to get to work!</p>
        ) : (
          <ul className="space-y-4">
            {missions.map((mission) => (
              <li key={mission.id}>
                <Link
                  href={`/missions/${mission.id}`}
                  className="block bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-blue-300">
                        Mission #{mission.id}
                      </h2>
                      <p className="text-sm text-gray-400">Target #{mission.target_id}</p>
                      <p className="text-sm text-gray-400">Assigned to Cat #{mission.assigned_to}</p>
                    </div>
                    <div className="sm:text-right mt-2 sm:mt-0">
                      <p className={`text-md font-semibold ${
                        mission.is_completed ? "text-green-400" : "text-red-400"
                      }`}>
                        {mission.is_completed ? "✅ Completed" : "❌ Pending"}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
