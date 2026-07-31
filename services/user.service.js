export async function getCurrentUser(token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
