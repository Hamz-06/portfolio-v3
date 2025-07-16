'use server'

import { getCookie } from "@/actions/cookies/cookieHelper";
import { randomPlaylist, randomPlaylists } from "@/lib/dev/playlistsGenerator"
import { client } from "@/sanity/lib/client";
import { PLAYLIST_SUMMARY_LIST_QUERY, PROJECTS_BY_SLUGS_QUERY, SINGLE_PLAYLIST_QUERY } from "@/sanity/lib/queries";
import { CategorisedProject, Playlist, PlaylistsSummary } from "@/sanity/schema/schema-types"

class PlaylistModel {

  async getPlaylistsSummary(): Promise<PlaylistsSummary | null> {
    console.log("Fetching playlists summary from Sanity...");
    if (process.env.NODE_ENV !== 'production') {
      return randomPlaylists;
    }
    const playlists = await client.fetch<PlaylistsSummary>(PLAYLIST_SUMMARY_LIST_QUERY, {})
    return playlists
  }

  async getPlaylist(playlistName: string): Promise<Playlist | null> {
    if (process.env.NODE_ENV !== 'production') {
      return randomPlaylist
    }

    const playlists = await client.fetch<Playlist | null>(SINGLE_PLAYLIST_QUERY, {
      slug: playlistName
    })
    return playlists
  }

  async getLikedPlaylist(): Promise<Playlist | null> {
    const likedProjects = await getCookie<string[]>('likes') || [];

    if (likedProjects.length === 0) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      return randomPlaylist
    }

    const playlist = await client.fetch<CategorisedProject[]>(PROJECTS_BY_SLUGS_QUERY, { slugs: likedProjects })

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
}

export { PlaylistModel }