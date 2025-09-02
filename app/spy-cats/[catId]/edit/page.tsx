"use client";

import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for 'Cancel' and 'Back' button

type Props = { params: Promise<{ catId: string }> }; // params тепер Promise

export default function EditCatPage({ params }: Props) {
  const spyCatsApi = new SpyCatsAPI();
  const router = useRouter();

  const resolvedParams = use(params); // <--- розпаковка Promise
  const catId = Number(resolvedParams.catId);

  const [cat, setCat] = useState<SpyCat | null>(null);
  const [salary, setSalary] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    spyCatsApi
      .getCat(catId)
      .then((c) => {
        setCat(c);
        setSalary(c.salary);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cat:", err.message);
        setError("Failed to fetch cat details.");
        setLoading(false);
      });
  }, [catId]);

  if (loading) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading...</p>
      </main>
    );
  }

  if (!cat) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-400 mb-4">{error || "Cat not found 😿"}</p>
          <Link
            href="/spy-cats"
            className="mt-4 inline-block text-blue-400 hover:text-blue-200 transition-colors"
          >
            ← Back to list
          </Link>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await spyCatsApi.updateCat(catId, { salary });
      router.push(`/spy-cats/${catId}`);
    } catch (err: any) {
      console.error("Failed to update cat:", err.message);
      setError(err.message);
    }
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Edit {cat.name} 🐱</h1>
        
        <div className="text-lg text-gray-300 mb-6 space-y-2">
          <p>
            <span className="font-medium text-gray-400">Breed:</span> {cat.breed}
          </p>
          <p>
            <span className="font-medium text-gray-400">Experience:</span> {cat.exp_years} years
          </p>
        </div>

        {error && (
          <p className="bg-red-900 text-red-300 p-3 rounded-md mb-4 text-center text-sm font-medium">
            Error: {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-400 mb-1">
              New Salary ($)
            </label>
            <input
              id="salary"
              type="text" // Changed to text to remove spinners
              value={salary === 0 ? "" : salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div className="flex flex-row gap-4">
            <button
              type="submit"
              className="flex-1 text-center bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
            >
              Save
            </button>
            <Link
              href={`/spy-cats/${catId}`}
              className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
