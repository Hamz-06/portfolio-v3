// api/playlists

import { randomPlaylists } from "@/lib/dev/playlistsGenerator";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_SUMMARY_LIST_QUERY } from "@/sanity/lib/queries";
import { PlaylistsSummary } from "@/sanity/schema/schema-types";
import { NextResponse } from "next/server";

export type PlaylistsResponse = PlaylistsSummary;

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<PlaylistsResponse>(
        randomPlaylists, { status: 200 }
      )
    }
    const playlists = await client.fetch<PlaylistsSummary>(PLAYLIST_SUMMARY_LIST_QUERY, {})

    return NextResponse.json<PlaylistsResponse>(
      playlists, { status: 200 })

  } catch (error) {
    console.error("Error fetching playlists from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
