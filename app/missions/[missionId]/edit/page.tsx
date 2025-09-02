"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";

export default function EditMissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.missionId;

  const [isCompleted, setIsCompleted] = useState(false);
  const [targetNotes, setTargetNotes] = useState<string[]>([]);
  const [assignedTo, setAssignedTo] = useState<number | undefined>(undefined);
  const [unassign, setUnassign] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [spyCats, setSpyCats] = useState<SpyCat[]>([]);

  useEffect(() => {
    if (!missionId) {
      setLoading(false);
      return;
    }

    async function fetchMissionAndCats() {
      try {
        const spyCatsApi = new SpyCatsAPI();
        const cats = await spyCatsApi.getCats();
        setSpyCats(cats);

        const res = await fetch(`http://127.0.0.1:8000/missions/${missionId}`);
        if (!res.ok) {
          const errorData = await res.json();
          const errorMessage = errorData.detail 
            ? `Error: ${errorData.detail}` 
            : "Failed to fetch mission data.";
          throw new Error(errorMessage);
        }
        const data = await res.json();
        setIsCompleted(data.is_completed);
        setTargetNotes(data.target.notes.map((n: any) => n.note));
        setAssignedTo(data.assigned_to?.id ?? undefined);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMissionAndCats();
  }, [missionId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      is_completed: isCompleted,
      target_notes: targetNotes,
      replace_target_notes: true,
      assign_to: assignedTo,
      unassign: unassign,
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/missions/${missionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.detail 
          ? `Error: ${errorData.detail}` 
          : "Failed to update mission. Please check your data.";
        throw new Error(errorMessage);
      }

      router.push(`/missions/${missionId}`);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading mission data...</p>
      </main>
    );
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">✏️ Edit Mission #{missionId}</h1>
          <Link
            href={`/missions/${missionId}`}
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
          <div className="flex items-center space-x-2">
            <input
              id="isCompleted"
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isCompleted" className="text-lg font-medium text-gray-400">
              Completed
            </label>
          </div>

          <div>
            <label htmlFor="targetNotes" className="block text-sm font-medium text-gray-400 mb-1">
              Target Notes (one per line)
            </label>
            <textarea
              id="targetNotes"
              value={targetNotes.join("\n")}
              onChange={(e) => setTargetNotes(e.target.value.split("\n"))}
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
              value={assignedTo ?? ""}
              onChange={(e) => setAssignedTo(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Unassigned</option>
              {spyCats.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (ID: {cat.id})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="unassign"
              type="checkbox"
              checked={unassign}
              onChange={(e) => setUnassign(e.target.checked)}
              className="form-checkbox h-5 w-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
            />
            <label htmlFor="unassign" className="text-lg font-medium text-gray-400">
              Unassign spy
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            💾 Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
