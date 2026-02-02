import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API_KEY mancante" }, { status: 500 });
  }

  const searchParams = new URLSearchParams();
  searchParams.set("key", apiKey);
  searchParams.set("page", '1');

  
  // chiamata all'API esterna con la key
  const upstream = await fetch(`https://api.rawg.io/api/games?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
