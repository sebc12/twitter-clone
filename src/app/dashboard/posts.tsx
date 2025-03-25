"use client";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/api";

type Post = {
  id: number;
  content: string;
  user: { name: string };
  comments: any[];
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
      } catch (err) {
        setError("Failed to load posts");
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 my-2">
            <p className="font-bold">{post.user.name}:</p>
            <p>{post.content}</p>
            <p>
              💬 {post.comments.length} | ❤️ {post.likes.length}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
