import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API_KEY mancante" }, { status: 500 });
  }

  const { id } = await params;

  // chiamata all'API esterna per ottenere il dettaglio del gioco
  const upstream = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${apiKey}`,
    {
      cache: "no-store",
    }
  );

  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Upstream ${upstream.status}` },
      { status: 502 }
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
