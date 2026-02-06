"use client";
import Link from "next/link";

export default function GameDetailError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading game</h1>
        <Link href="/" className="mt-4 inline-block text-purple-500 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}