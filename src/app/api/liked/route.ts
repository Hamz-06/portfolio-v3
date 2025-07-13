// api/liked

import { randomPlaylist } from "@/lib/dev/playlistsGenerator";
import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CategorisedProject, Playlist } from "@/sanity/schema/schema-types";
// import { LikedProjects } from "@/types/likes";
import { NextRequest, NextResponse } from "next/server";

export type LikedResponse = Playlist

export async function POST(request: NextRequest) {
  try {

    const likedProjects = await request.json() as string[];
    if (likedProjects.length === 0) {
      return NextResponse.json<LikedResponse>(
        null, { status: 200 }
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<LikedResponse>(
        randomPlaylist, { status: 200 }
      )
    }

    const likedPlaylist = await getLikedPlaylist(likedProjects)

    return NextResponse.json<LikedResponse>(
      likedPlaylist, { status: 200 })

  } catch (error) {
    console.error("Error fetching profile from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}


const getLikedPlaylist = async (likedProjects: string[]): Promise<Playlist> => {
  const slugs = likedProjects;
  //todo rename this query to something more meaningful
  const playlist = await client.fetch<CategorisedProject[]>(PROJECTS_BY_SLUGS_QUERY, { slugs: slugs })

  const likedPlaylists: Playlist = {
    description: "Liked Projects",
    playlist_name: "Liked Projects",
    pinned: true,
    slug: "liked-projects",
    type: "liked",
    playlist_cover_image: "/playlist-heart.png",
    playlist: playlist
  }
  return likedPlaylists;
}
