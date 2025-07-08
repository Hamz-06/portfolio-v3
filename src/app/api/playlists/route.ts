// api/playlists

import { randomPlaylists } from "@/lib/playlistsGenerator";
import { client } from "@/sanity/lib/client";
import { PLAYLISTS_HOME_PAGE } from "@/sanity/lib/queries";
import { Playlists } from "@/schema/schema-types";
import { NextResponse } from "next/server";

export type PlaylistsResponse = Playlists;

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<PlaylistsResponse>(
        randomPlaylists, { status: 200 }
      )
    }
    const playlists = await client.fetch<Playlists>(PLAYLISTS_HOME_PAGE, {})

    return NextResponse.json<PlaylistsResponse>(
      playlists, { status: 200 })

  } catch (error) {
    console.error("Error fetching playlists from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
