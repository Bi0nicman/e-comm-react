"use client";

import { useGetGameByIdQuery } from "@/app/lib/services/gamesApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/app/lib/interfaces/games";
import Loading from "./loading";
import Error from "./error";
export default function Page() {
  const params = useParams();
  const gameId = Number(params.id);

  const { data: game, isLoading, error } = useGetGameByIdQuery(gameId);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error || !game || game.name === 'NaN') {
    return (
      <Error />
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back button */}
        <Link href="/" className="mb-6 inline-flex items-center text-purple-500 hover:underline">
          <svg
            className="mr-2 size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </Link>

        {/* Hero image */}
        {game.background_image && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={game.background_image}
              alt={game.name}
              width={640}
              height={360}
              className="h-96 w-full object-cover"
            />
          </div>
        )}

        {/* Game info */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-4xl font-bold">{game.name}</h1>

            {/* Ratings and stats */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="rounded-lg bg-slate-800 px-4 py-2">
                <span className="text-sm text-gray-400">Rating</span>
                <p className="text-xl font-bold text-yellow-500">
                  {game.rating} / 5
                </p>
              </div>
              <div className="rounded-lg bg-slate-800 px-4 py-2">
                <span className="text-sm text-gray-400">Metacritic</span>
                <p className="text-xl font-bold text-green-500">
                  {game.metacritic || "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-slate-800 px-4 py-2">
                <span className="text-sm text-gray-400">Released</span>
                <p className="text-xl font-bold">{game.released || "TBA"}</p>
              </div>
              <div className="rounded-lg bg-slate-800 px-4 py-2">
                <span className="text-sm text-gray-400">Playtime</span>
                <p className="text-xl font-bold">{game.playtime}h</p>
              </div>
            </div>

            {/* Description */}
            {(game as Game).description && (
              <div className="mb-6">
                <h2 className="mb-3 text-2xl font-semibold">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {(game as Game).description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platforms */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="rounded-lg bg-slate-800 p-4">
                <h3 className="mb-3 font-semibold">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p) => (
                    <span
                      key={p.platform.id}
                      className="rounded bg-purple-600 px-2 py-1 text-xs"
                    >
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ESRB Rating */}
            {game.esrb_rating && (
              <div className="rounded-lg bg-slate-800 p-4">
                <h3 className="mb-3 font-semibold">ESRB Rating</h3>
                <p className="text-lg">{game.esrb_rating.name}</p>
              </div>
            )}

            {/* Stats */}
            <div className="rounded-lg bg-slate-800 p-4">
              <h3 className="mb-3 font-semibold">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Added by</span>
                  <span className="font-semibold">{game.added}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews</span>
                  <span className="font-semibold">{game.ratings_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Suggestions</span>
                  <span className="font-semibold">{game.suggestions_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
