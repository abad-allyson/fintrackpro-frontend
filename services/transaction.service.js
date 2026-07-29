export async function addTransaction(data, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

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

export async function getAllTransactions(token, query = {}) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/api/transactions?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions.");
  }

  return response.json();
}

export async function updateTransaction(id, data, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update transaction.");
  }

  return response.json();
}

export async function deleteTransaction(id, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete transaction.");
  }

  return response.json();
}
