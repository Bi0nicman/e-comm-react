"use client";
import Link from "next/link";
import { NAV_LINKS } from "../constants/nat";
import { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useSearchGamesQuery } from "@/app/lib/services/gamesApi";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";

export function Navbar() {

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selector = useAppSelector((state) => state.favourites);
  const { data: searchResults, isFetching } = useSearchGamesQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowSearch(false);
      setSearchTerm("");
    }
  }, []); const triggerSearch = () => {
    setShowSearch(canShow => !canShow);
    if (showSearch) {
      setSearchTerm("");
    }
  }

  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, []);

  return (
    <header className="border-b border-purple-600 bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block size-2 rounded-full bg-purple-500" />
          Nebula
        </Link>
        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {
            showSearch ? (
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={[
                    "w-md w-full border-b-2 border-gray-300 bg-slate-900 px-3 py-1 text-sm text-white",
                    "placeholder-gray-400 focus:border-purple-600 focus:outline-none ",
                    styles.searchBar].join(" ")}
                  placeholder="Search games... (min 3 chars)"
                  autoFocus
                />
                {isFetching && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <div className="size-4 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  </div>
                )}
                {searchResults && searchResults.length > 0 && (
                  <div className="w-md absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-lg border border-purple-600 bg-slate-800 shadow-xl z-50">
                    {searchResults.map((game) => (
                      <Link
                        key={game.id}
                        href={`/game/${game.id}`}
                        className="flex items-center gap-3 border-b border-slate-700 p-3 hover:bg-slate-700 last:border-b-0"
                        onClick={closeSearch}
                      >
                        {game.background_image && (
                          <Image
                            src={game.background_image}
                            alt={game.name}
                            width={40}
                            height={40}
                            className="h-12 w-16 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-white">{game.name}</p>
                          <p className="text-xs text-gray-400">
                            Rating: {game.rating} | Released: {game.released}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {searchTerm.length >= 3 && searchResults?.length === 0 && !isFetching && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-purple-600 bg-slate-800 p-4 text-center text-gray-400 shadow-xl z-50">
                    No games found
                  </div>
                )}
              </div>
            ) : (
              NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-semibold hover:underline">
                  {l.label}
                </Link>
              ))
            )
          }

          <div className="hidden lg:flex">
            <Link href="/login" className="text-sm text-purple-500 font-semibold hover:underline">
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {
          showSearch ?
            (
              <button
                type="button"
                aria-label="cancel search"
                className="rounded-md p-2 text-gray-200 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  closeSearch();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

            ) : (
              <button
                type="button"
                aria-label="Search"
                className="rounded-md p-2 text-gray-200 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  triggerSearch();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            )
        }
        <span className="text-sm bg-purple-900 px-2 py-1 font-bold rounded">
          {selector.length} {selector.length === 1 ? "favorite" : "favorites"}
        </span>
        {/* Mobile button */}

      </nav>

      {/* Mobile panel */}

    </header>
  );
}