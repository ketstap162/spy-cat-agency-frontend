"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";

export default function CreateMissionPage() {
  const router = useRouter();
  const [targetName, setTargetName] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [notes, setNotes] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<number>(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [spyCats, setSpyCats] = useState<SpyCat[]>([]);

  useEffect(() => {
    async function fetchSpyCats() {
      try {
        const api = new SpyCatsAPI();
        const cats = await api.getCats();
        setSpyCats(cats);
      } catch (err: any) {
        setError("Failed to load spy cats list.");
      } finally {
        setLoading(false);
      }
    }
    fetchSpyCats();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      target: {
        name: targetName,
        country: targetCountry,
        notes: notes.split("\n").filter(n => n.trim() !== ""),
      },
      assigned_to: assignedTo === 0 ? null : assignedTo,
      is_completed: false,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/missions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.detail 
          ? `Error: ${errorData.detail}` 
          : "Failed to create mission. Please check your data.";
        throw new Error(errorMessage);
      }

      router.push("/missions");
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading spy cats...</p>
      </main>
    );
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">➕ Create Mission</h1>
          <Link
            href="/missions"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back
          </Link>
        </div>

        {error && (
          <p className="bg-red-900 text-red-300 p-3 rounded-md mb-4 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="targetName" className="block text-sm font-medium text-gray-400 mb-1">
              Target Name
            </label>
            <input
              id="targetName"
              type="text"
              placeholder="Target Name"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="targetCountry" className="block text-sm font-medium text-gray-400 mb-1">
              Target Country
            </label>
            <input
              id="targetCountry"
              type="text"
              placeholder="Target Country"
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">
              Notes (one per line)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter notes for the target..."
            />
          </div>
          
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-400 mb-1">
              Assign to Spy Cat
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value={0}>Unassigned</option>
              {spyCats.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (ID: {cat.id})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            Create Mission
          </button>
        </form>
      </div>
    </main>
  );
}