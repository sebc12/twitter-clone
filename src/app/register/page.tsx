"use client";

import { useState } from "react";
import { register } from "../../lib/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(name, email, password);

    if (result.success) {
      window.location.href = "/login";
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="py-16">
      <form onSubmit={handleLogin} className="border p-4 m-auto w-1/3">
        <h1 className="text-xl font-bold text-center">Login</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full mb-4"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full mb-4"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full mb-4"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="border px-6 py-1 bg-green-300 hover:bg-green-500 cursor-pointer rounded-md"
          >
            Login
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
