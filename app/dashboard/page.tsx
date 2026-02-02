"use client";
import { useEffect } from "react";  

export default function Dashboard(){

 
  const loadGames = async () => {
    const res = await fetch(`/api/games`);
    const data = await res.json();
    return data.results;
  }

  useEffect(() => {
    loadGames().then(games => {
      console.log(games);
    });
  }, []);

  return(
    <div></div>
  )
}