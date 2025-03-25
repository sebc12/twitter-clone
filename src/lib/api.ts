import { getToken } from "./auth";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};

// Fetch posts using the general fetchWithAuth function
export const fetchPosts = async () => {
  return fetchWithAuth("http://127.0.0.1:8000/api/posts");
};
