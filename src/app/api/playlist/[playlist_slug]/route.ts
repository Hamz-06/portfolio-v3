// api/playlists

import { randomPlaylist } from "@/lib/playlistsGenerator";
import { replaceString } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_HOME_PAGE } from "@/sanity/lib/queries";
import { Playlist } from "@/schema/schema-types";
import { NextRequest, NextResponse } from "next/server";

export type PlaylistResponse = Playlist;

type Params = { params: Promise<{ playlist_slug: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { playlist_slug } = await params;

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<PlaylistResponse>(
        randomPlaylist, { status: 200 }
      )
    }

    const replaceStringObjectMap: Record<string, string> = {
      'REPLACE_SLUG': playlist_slug
    }

    const UPDATED_QUERY = replaceString(replaceStringObjectMap, PLAYLIST_HOME_PAGE)
    const playlists = await client.fetch<Playlist>(UPDATED_QUERY, {})

    return NextResponse.json<PlaylistResponse>(
      playlists, { status: 200 })

  } catch (error) {
    console.error("Error fetching playlists from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
