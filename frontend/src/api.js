export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/apod';


export async function getToday() {
const res = await fetch(`${API_BASE}/today`);
if (!res.ok) throw new Error('Failed to fetch');
return res.json();
}


export async function getByDate(date) {
const res = await fetch(`${API_BASE}?date=${date}`);
if (!res.ok) throw new Error('Failed to fetch');
return res.json();
}


export async function getRange(start, end) {
const res = await fetch(`${API_BASE}/range?start_date=${start}&end_date=${end}`);
if (!res.ok) throw new Error('Failed to fetch');
return res.json();
}