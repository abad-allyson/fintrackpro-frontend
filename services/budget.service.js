export async function addBudget(form, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function getAllBudgets(token, query = {}) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/api/budgets?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch budgets.");
  }

  return response.json();
}

export async function updateBudget(id, form, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/budgets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export async function deleteBudget(id, token) {
  const API_URL = process.env.NEXT_PUBLIC_API;

  const response = await fetch(`${API_URL}/api/budgets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to delete budget.");
  }

  return data;
}
