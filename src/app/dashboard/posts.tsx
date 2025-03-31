"use client";
import useSWR from "swr";
import { format } from "date-fns";
import { fetchPosts, likePost } from "@/lib/api";
import { useState } from "react";

// API fetcher
const fetcher = async () => {
  return await fetchPosts(); // Henter posts fra API
};

type Post = {
  id: number;
  content: string;
  created_at: string;
  user: { name: string; email: string };
  comments: {
    id: number;
    content: string;
    created_at: string;
    user: { name: string };
    likes: any[];
  }[];
  likes: any[];
};

export default function Posts() {
  const { data: posts, error, mutate } = useSWR<Post[]>("/posts", fetcher);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLike = async (id: number, type: "post" | "comment") => {
    console.log(`Liked ${type} with ID: ${id}`);

    // Optimistisk UI - Opdaterer UI med det samme
    mutate(
      async (currentData) => {
        if (!currentData) return currentData; // Hvis data ikke er hentet endnu

        // Opdater lokalt (optimistisk)
        const updatedData = currentData.map((post) => {
          if (type === "post" && post.id === id) {
            return { ...post, likes: [...post.likes, { id: Date.now() }] }; // Simuler nyt like
          }
          return post;
        });

        // Udfør det rigtige API-kald
        await likePost(id, type);

        // Hent opdaterede data fra serveren
        return await fetchPosts();
      },
      { revalidate: true }
    );
  };

  if (error) return <p className="text-red-500">Failed to load posts</p>;

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ul className="m-auto w-1/2 border-x">
        {posts?.map((post) => (
          <li key={post.id} className="border-y p-2">
            <div className="flex space-x-2">
              <p className="font-bold">{post.user.name}</p>
              <p>{post.user.email}</p>
              <p>{format(new Date(post.created_at), "dd-MM-yyyy")}</p>
            </div>

            <p>{post.content}</p>
            <p className="text-end">
              💬 {post.comments.length} |{" "}
              <button onClick={() => handleLike(post.id, "post")}>
                ❤️ {post.likes.length}
              </button>
            </p>

            {/* Display comments */}
            <div className="mt-2">
              <h3 className="font-semibold">Comments</h3>
              <ul>
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <li key={comment.id} className="border-t p-1">
                      <div className="flex space-x-2">
                        <p className="font-bold">{comment.user.name}</p>
                        <p>
                          {format(new Date(comment.created_at), "dd-MM-yyyy")}
                        </p>
                      </div>
                      <p>{comment.content}</p>
                    </li>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
