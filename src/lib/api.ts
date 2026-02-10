// lib/api.ts

export const APP_URL = "https://options-market-next-2d8c.vercel.app"; // Your actual URL

export const fetchWithAuth = async (endpoint: string) => {
  const url = `${APP_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // 👇 THIS IS THE MOST IMPORTANT PART
    credentials: "include", 
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
};
