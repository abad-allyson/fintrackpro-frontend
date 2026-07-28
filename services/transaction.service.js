export async function addTransaction(data, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;
  console.log(API_URL);

  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add transaction.");
  }

  return response.json();
}
