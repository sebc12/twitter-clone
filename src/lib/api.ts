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

export const createPost = async (data: { content: string }) => {
  return fetchWithAuth("http://127.0.0.1:8000/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const likePost = async (id: number, type: "post" | "comment") => {
  return fetchWithAuth("http://127.0.0.1:8000/api/likes", {
    method: "POST",
    body: JSON.stringify({
      likeable_id: id,
      likeable_type: type,
    }),
  });
};

export const createComment = async (id: number, data: { content: string }) => {
  return fetchWithAuth(`http://127.0.0.1:8000/api/posts/${id}/comments`, { 
    method: "POST",
    body: JSON.stringify(data),
  });
};

