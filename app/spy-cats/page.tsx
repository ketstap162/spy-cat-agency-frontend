import Link from "next/link";
import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";

export default async function SpyCatsPage() {
  const spyCatsApi = new SpyCatsAPI();
  let cats: SpyCat[] = [];

  try {
    cats = await spyCatsApi.getCats();
  } catch (err: any) {
    console.error("Failed to fetch cats:", err.message);
  }

  return (
    <main className="p-8 font-sans bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-blue-400">🕵️‍♀️ Spy Cats</h1>
        <Link 
          href="/spy-cats/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
        >
          ➕ Recruit
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {cats.length === 0 ? (
          <p className="text-gray-400 text-center text-lg py-8">No spy cats found. Time to recruit some!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cats.map((cat) => (
              <Link href={`/spy-cats/${cat.id}`} key={cat.id} className="block">
                <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-blue-300 truncate">{cat.name}</h2>
                    <p className="text-gray-300 text-sm truncate">
                      <span className="font-medium text-gray-400">Breed:</span> {cat.breed}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      <span className="font-medium text-gray-400">Salary:</span> ${cat.salary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}