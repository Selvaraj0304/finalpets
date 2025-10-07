const API_BASE = "http://localhost:8080/api";

export const getPets = async () => {
  const response = await fetch(`${API_BASE}/pets`);
  if (!response.ok) throw new Error("Failed to load pets");
  return response.json();
};

export const getPetById = async (id) => {
  const response = await fetch(`${API_BASE}/pets/${id}`);
  if (!response.ok) throw new Error("Could not fetch pet details");
  return response.json();
};

export const createPet = async (pet) => {
  const response = await fetch(`${API_BASE}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  if (!response.ok) throw new Error("Failed to create pet");
  return response.json();
};
