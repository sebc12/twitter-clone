import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-16">
      <div>
        <h1 className="text-4xl font-bold text-center">Twitter clone</h1>
        <p className="text-center mt-4">This is a simple twitter example</p>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Link href="/login">
          <button className="border px-4 py-1 bg-green-300 hover:bg-green-500 cursor-pointer rounded-md">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="border px-4 py-1 bg-blue-300 hover:bg-blue-500 cursor-pointer rounded-md">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
