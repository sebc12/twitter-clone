"use client";
import { useState } from "react";
import { createComment } from "@/lib/api"; // Sørg for at have en funktion til at oprette kommentarer

export default function CreateComment({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { content };
    console.log("Creating comment:", data, postId);
    try {
      await createComment(postId, data); // Opret kommentar
      setContent(""); // Tøm inputfeltet efter oprettelse
      setError(""); // Tøm fejlmeddelelse
    } catch (err) {
      // Hvis der opstår en fejl, vis fejlmeddelelse
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="border p-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Skriv en kommentar..."
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Kommentér
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
