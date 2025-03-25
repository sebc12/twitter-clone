"use client";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/api";

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
  }[]; // Kommentars struktur
  likes: any[];
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(); // Fjernet token som argument
        setPosts(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load posts");
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="m-auto w-1/2 border-x">
        {posts.map((post) => (
          <li key={post.id} className="border-y p-2">
            <div className="flex space-x-2">
              <p className="font-bold">{post.user.name}</p>
              <p>{post.user.email}</p>
              <p>{post.created_at}</p>
            </div>

            <p>{post.content}</p>
            <p className="text-end">
              💬 {post.comments.length} | ❤️ {post.likes.length}
            </p>

            {/* Vis kommentarer */}
            <div className="mt-2">
              <h3 className="font-semibold">Comments:</h3>
              <ul>
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <li key={comment.id} className="border-t p-1">
                      {/* Vis kommentators navn her */}
                      <div className="flex space-x-2">
                        <p className="font-bold">{comment.user.name}</p>
                        <p className="">{comment.created_at}</p>
                      </div>

                      <p>{comment.content}</p>
                    </li>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
