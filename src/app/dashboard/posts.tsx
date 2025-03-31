"use client";
import useSWR from "swr";
import { format } from "date-fns";
import { fetchPosts, likePost } from "@/lib/api";
import { useState } from "react";
import { Post } from "../../types/posts"; // Importer Post type
import CreateComment from "./CreateComment";

// API fetcher
const fetcher = async () => {
  return await fetchPosts(); // Henter posts fra API
};

export default function Posts() {
  const { data: posts, error, mutate } = useSWR<Post[]>("/posts", fetcher);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(posts);

  const handleLike = async (id: number, type: "post" | "comment") => {
    try {
      console.log(`Liked ${type} with ID: ${id}`);

      await likePost(id, type); // Send like til API
      mutate(); // Hent de opdaterede data fra serveren
    } catch (error) {
      console.error("Fejl ved like:", error);
      setErrorMessage("Kunne ikke like. Prøv igen senere.");
    }
  };

  if (error) return <p className="text-red-500">Failed to load posts</p>;

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ul className="m-auto w-1/2 space-y-4">
        {posts?.map((post) => (
          <li key={post.id} className="border p-2">
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
            {/* Display comments form */}
            <CreateComment postId={post.id} />

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
                      <p className="text-end">
                        <button
                          onClick={() => handleLike(comment.id, "comment")}
                        >
                          ❤️ {comment.likes?.length || 0}
                        </button>
                      </p>
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
