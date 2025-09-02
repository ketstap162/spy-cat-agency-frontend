import { NEXT_PUBLIC_BACKEND_MISSIONS, NEXT_PUBLIC_BACKEND_URL } from "../config";

export type Mission = {
  id: number;
  target_id: number;
  assigned_to: number;
  is_completed: boolean;
};

export class MissionsAPI {
  private baseUrl = `${NEXT_PUBLIC_BACKEND_URL}/${NEXT_PUBLIC_BACKEND_MISSIONS}`; // наприклад "http://127.0.0.1:8000/missions"

  async getAll(): Promise<Mission[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error("Failed to fetch missions");
    return res.json();
  }

  async get(id: number): Promise<Mission> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch mission");
    return res.json();
  }

  async create(mission: Omit<Mission, "id">): Promise<Mission> {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });
    if (!res.ok) throw new Error("Failed to create mission");
    return res.json();
  }

  async update(id: number, mission: Partial<Omit<Mission, "id">>): Promise<Mission> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });
    if (!res.ok) throw new Error("Failed to update mission");
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete mission");
  }
}
