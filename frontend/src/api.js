// Auto-detect backend URL (same Render service)
export const API_BASE =
  import.meta.env.PROD
    ? "https://nasa-apod-explorer-ejyr.onrender.com/api/apod"
    : "http://localhost:5000/api/apod";

// Fetch today's APOD
export async function getToday() {
  const res = await fetch(`${API_BASE}/today`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

// Fetch APOD by date
export async function getByDate(date) {
  const res = await fetch(`${API_BASE}?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

// Fetch APOD range
export async function getRange(start, end) {
  const res = await fetch(
    `${API_BASE}/range?start_date=${start}&end_date=${end}`
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
