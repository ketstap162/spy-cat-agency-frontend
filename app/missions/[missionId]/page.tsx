"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Note = { id: number; note: string; target_id: number };
type Target = { name: string; country: string; notes: Note[] };
type SpyCat = { id: number; name: string; exp_years: number; breed: string; salary: number } | null;
type Mission = { id: number; is_completed: boolean; target: Target; spy_cat: SpyCat };

export default function MissionDetails() {
  const params = useParams();
  const missionId = params.missionId;
  const [mission, setMission] = useState<Mission | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!missionId) {
      setLoading(false);
      return;
    }

    async function fetchMission() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/missions/${missionId}`);
        if (!res.ok) throw new Error("Failed to fetch mission");
        const data: Mission = await res.json();
        setMission(data);
      } catch (err: any) {
        console.error("Failed to fetch mission:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMission();
  }, [missionId]);

  if (loading) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading mission...</p>
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

  if (!mission) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-400">Mission not found 🕵️‍♂️</p>
      </main>
    );
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-2">Mission #{mission.id}</h1>
        <p className={`text-xl font-semibold mb-6 ${mission.is_completed ? "text-green-400" : "text-red-400"}`}>
          Status: {mission.is_completed ? "✅ Completed" : "❌ Pending"}
        </p>

        <div className="space-y-6">
          <div className="p-5 bg-gray-700 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-200 mb-2">🎯 Target</h2>
            <div className="text-lg text-gray-300 space-y-1">
              <p><span className="font-medium text-gray-400">Name:</span> {mission.target.name}</p>
              <p><span className="font-medium text-gray-400">Country:</span> {mission.target.country}</p>
            </div>
          </div>

          {mission.target.notes.length > 0 && (
            <div className="p-5 bg-gray-700 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold text-gray-200 mb-2">📝 Notes</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-md">
                {mission.target.notes.map((note) => (
                  <li key={note.id}>{note.note}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-5 bg-gray-700 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-200 mb-2">🐱‍👤 Assigned Spy Cat</h2>
            {mission.spy_cat ? (
              <div className="text-lg text-gray-300 space-y-1">
                <p><span className="font-medium text-gray-400">Name:</span> {mission.spy_cat.name}</p>
                <p><span className="font-medium text-gray-400">Breed:</span> {mission.spy_cat.breed}</p>
                <p><span className="font-medium text-gray-400">Experience:</span> {mission.spy_cat.exp_years} years</p>
                <p><span className="font-medium text-gray-400">Salary:</span> ${mission.spy_cat.salary}</p>
              </div>
            ) : (
              <p className="text-gray-400">No spy assigned</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
          <Link
            href="/missions"
            className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            🔙 Back to list
          </Link>
          <Link
            href={`/missions/${mission.id}/edit`}
            className="flex-1 text-center bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            ✏️ Update Mission
          </Link>
        </div>
      </div>
    </main>
  );
}