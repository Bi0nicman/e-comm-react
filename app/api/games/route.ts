import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API_KEY mancante" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const isSearchPresent = searchParams.has("search");

  const upstreamParams = new URLSearchParams();
  upstreamParams.set("key", apiKey);
  upstreamParams.set("page", '1');
  upstreamParams.set("page_size", '10');
  if(isSearchPresent) {
    upstreamParams.set("search", searchParams.get("search")!);
  }
  // chiamata all'API esterna con la key
  /*
  no-cache significa puoi anche usare la cache, ma devi prima “ricontrollare” col server (revalidate) se è ancora valida.
  no-store invece dice di non usare la cache in nessun modo, e di andare sempre a prendere i dati freschi dal server.
  */
  const upstream = await fetch(`https://api.rawg.io/api/games?${upstreamParams.toString()}`, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
