import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_BACKEND_SPY_CATS } from "@/lib/config";

export type SpyCat = {
  id: number;
  name: string;
  exp_years: number;
  breed: string;
  salary: number;
};

export class SpyCatsAPI {
  private readonly BASE_URL: string;

  constructor() {
    this.BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/${NEXT_PUBLIC_BACKEND_SPY_CATS}`; // тут просто /spi_cats
  }

  // GET /spi_cats
  async getCats(): Promise<SpyCat[]> {
    const res = await fetch(this.BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch cats: ${res.status}`);
    return res.json();
  }

  // POST /spi_cats
  async createCat(cat: Omit<SpyCat, "id">): Promise<SpyCat> {

    console.log("createCat func: URL =", this.BASE_URL);

    const res = await fetch(this.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cat), // передаємо об'єкт cat
    });
    if (!res.ok) throw new Error(`Failed to create cat: ${res.status}`);
    return res.json();
  }

  // GET /spi_cats/{id}
  async getCat(id: number): Promise<SpyCat> {
    const res = await fetch(`${this.BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch cat: ${res.status}`);
    return res.json();
  }

  // PATCH /spi_cats/{id}
  async updateCat(id: number, data: Partial<Pick<SpyCat, "salary">>): Promise<SpyCat> {
    const res = await fetch(`${this.BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update cat: ${res.status}`);
    return res.json();
  }

  // DELETE /spi_cats/{id}
  async deleteCat(id: number): Promise<void> {
    const res = await fetch(`${this.BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete cat: ${res.status}`);
  }
}

// створюємо екземпляр для використання у фронтенді
export const spyCatsApi = new SpyCatsAPI();
