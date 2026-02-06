"use client";
import { useAppSelector } from "../lib/hooks";

export default function Elenco() {
const selector = useAppSelector((state) => state.favourites);
console.log("favourites", selector);

return (  <div>
    <h1>Elenco dei preferiti</h1>
    <ul>
      {selector.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  </div>
);
}