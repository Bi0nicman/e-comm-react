"use client";
import { useAppSelector } from "../lib/hooks";
export default function Page() {
  
  const selector = useAppSelector((state) => state.favourites);

  return (
    <div>
      <h1>Lista Preferiti</h1>
      {selector.length === 0 ? (
        <p>Non ci sono preferiti</p>
      ) : (
        <ul>
          {selector.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}