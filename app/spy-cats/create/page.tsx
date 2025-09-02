"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { spyCatsApi } from "@/lib/spy-cats/api";
import Link from "next/link"; // Import Link for navigation

export default function CreateCatPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    exp_years: 0,
    breed: "",
    salary: 0,
  });
  const [error, setError] = useState("");
  const [validBreeds, setValidBreeds] = useState<string[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [fetchBreedsError, setFetchBreedsError] = useState("");

  // Fetch valid breeds on component mount
  useEffect(() => {
    async function fetchBreeds() {
      try {
        const res = await fetch("http://127.0.0.1:8000/spy_cats/options/breeds");
        if (!res.ok) {
          throw new Error(`Failed to fetch breeds: ${res.statusText}`);
        }
        const breeds: string[] = await res.json();
        setValidBreeds(breeds);
      } catch (err: any) {
        console.error("Failed to fetch breeds:", err.message);
        setFetchBreedsError(err.message);
      } finally {
        setLoadingBreeds(false);
      }
    }

    fetchBreeds();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Client-side validation for the breed field
    if (!validBreeds.includes(form.breed)) {
      setError("Please select a valid breed from the list.");
      return;
    }

    try {
      await spyCatsApi.createCat(form);
      router.push("/spy-cats");
    } catch (err: any) {
      console.error("Failed to create cat:", err.message);
      setError(err.message);
    }
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">➕ Recruit New Spy Cat</h1>
          <Link 
            href="/spy-cats" 
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back
          </Link>
        </div>
        
        {error && (
          <p className="bg-red-900 text-red-300 p-3 rounded-md mb-4 text-center text-sm font-medium">
            Error: {error}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Agent Fluffy"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-400 mb-1">
              Breed
            </label>
            {loadingBreeds ? (
              <p className="text-gray-400 text-sm">Loading breeds...</p>
            ) : fetchBreedsError ? (
              <p className="text-red-300 text-sm">Failed to load breeds: {fetchBreedsError}</p>
            ) : (
              <>
                <input
                  id="breed"
                  type="text"
                  placeholder="Start typing or select a breed"
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  list="breed-options"
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <datalist id="breed-options">
                  {validBreeds.map((breed) => (
                    <option key={breed} value={breed} />
                  ))}
                </datalist>
              </>
            )}
          </div>
          
          <div>
            <label htmlFor="exp_years" className="block text-sm font-medium text-gray-400 mb-1">
              Years of Experience
            </label>
            <input
              id="exp_years"
              type="text"
              placeholder="e.g., 5"
              value={form.exp_years === 0 ? "" : form.exp_years}
              onChange={(e) => setForm({ ...form, exp_years: Number(e.target.value) })}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-400 mb-1">
              Salary ($)
            </label>
            <input
              id="salary"
              type="text"
              placeholder="e.g., 50000"
              value={form.salary === 0 ? "" : form.salary}
              onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            Recruit Cat
          </button>
        </form>
      </div>
    </main>
  );
}