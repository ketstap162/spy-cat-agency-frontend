import Link from "next/link";
import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";
import { DeleteCatButton } from "./DeleteCatButton";

type Props = { params: { catId: string } };

export default async function SpyCatDetails({ params }: Props) {
  const spyCatsApi = new SpyCatsAPI();
  let cat: SpyCat | null = null;

  try {
    cat = await spyCatsApi.getCat(Number(params.catId));
  } catch (err: any) {
    console.error("Failed to fetch cat details:", err.message);
  }

  if (!cat) {
    return (
      <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400">Cat not found 😿</p>
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

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4">{cat.name} 🐱</h1>

        <div className="space-y-3 text-lg text-gray-300 mb-6">
          <p>
            <span className="font-medium text-gray-400">Breed:</span> {cat.breed}
          </p>
          <p>
            <span className="font-medium text-gray-400">Experience:</span> {cat.exp_years} years
          </p>
          <p>
            <span className="font-medium text-gray-400">Salary:</span> ${cat.salary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
          <Link
            href={`/spy-cats/${cat.id}/edit`}
            className="w-full sm:w-2/3 text-center bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            ✏️ Edit
          </Link>
          <div className="w-full sm:w-1/3">
            <DeleteCatButton cat={cat} />
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <Link
            href="/spy-cats"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    </main>
  );
}