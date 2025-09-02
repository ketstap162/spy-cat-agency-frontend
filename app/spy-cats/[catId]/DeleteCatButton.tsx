"use client";

import { useRouter } from "next/navigation";
import { SpyCatsAPI, SpyCat } from "@/lib/spy-cats/api";

type Props = {
  cat: SpyCat;
};

export function DeleteCatButton({ cat }: Props) {
  const router = useRouter();
  const spyCatsApi = new SpyCatsAPI();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${cat.name}?`);
    if (!confirmed) return;

    try {
      await spyCatsApi.deleteCat(cat.id);
      router.push("/spy-cats");
    } catch (err: any) {
      console.error("Failed to delete cat:", err.message);
      alert("Failed to delete cat: " + err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
    >
      🗑️ Delete
    </button>
  );
}