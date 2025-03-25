"use client";
import { useState } from "react";
import { createPost } from "@/lib/api"; // Importer createPost funktionen
import { fetchPosts } from "@/lib/api";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePost = async (e: any) => {
    e.preventDefault();
    const data = { content };

    try {
      await createPost(data);
      setSuccess(true);
      setContent("");
      setError("");
    } catch (err) {
      // Hvis der opstår en fejl, vis fejlmeddelelse
      setError("Failed to create post. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="w-1/2 m-auto pb-16">
      <h2>Create Post</h2>

      {/* Vist ved succesfuld oprettelse */}
      {success && <p className="text-green-500">Post created successfully!</p>}

      {/* Vist ved fejl */}
      {error && <p className="text-red-500">{error}</p>}

      <form className="flex flex-col space-y-4" onSubmit={handlePost}>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Hvad sker der?"
          className="border p-2"
        />

        <div>
          <button
            type="submit"
            className="bg-blue-500 rounded-xl text-white p-2"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
