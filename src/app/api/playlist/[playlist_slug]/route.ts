// api/playlists

import { randomPlaylist } from "@/lib/dev/playlistsGenerator";
import { client } from "@/sanity/lib/client";
import { SINGLE_PLAYLIST_QUERY } from "@/sanity/lib/queries";
import { Playlist } from "@/sanity/schema/schema-types";
import { NextRequest, NextResponse } from "next/server";

export type PlaylistResponse = Playlist;

type Params = { params: Promise<{ playlist_slug: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { playlist_slug: playlistSlug } = await params;

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<PlaylistResponse>(
        randomPlaylist, { status: 200 }
      )
    }

    const playlists = await client.fetch<Playlist>(SINGLE_PLAYLIST_QUERY, {
      slug: playlistSlug
    })

    return NextResponse.json<PlaylistResponse>(
      playlists, { status: 200 })

  } catch (error) {
    console.error("Error fetching playlists from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
