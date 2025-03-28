// src/lib/auth.ts
import Cookies from "js-cookie";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Gem token i cookie
      Cookies.set("token", data.token, { expires: 7, path: "/" });
      return { success: true, token: data.token };
    } else {
      return { success: false, error: "Invalid login credentials" };
    }
  } catch (error) {
    return { success: false, error: "Login failed" };
  }
};

// Funktion til at hente token fra cookie
export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const register = async (name: string, email: string, password: string) => {
  try { 
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.token };
    }
    return { success: false, error: data.error || "Registration failed" };
  } catch (error) {
    return { success: false, error: "Registration failed" };
  }
};

// Funktion til at logge ud
export const logout = () => {
  Cookies.remove("token");
};
