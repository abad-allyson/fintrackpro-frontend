export async function getDashboardSummary(token) {
  const API_URL = process.env.NEXT_PUBLIC_API;
  const response = await fetch(`${API_URL}/api/dashboard/monthly-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(error);
    throw new Error(error);
  }

  return response.json();
}
