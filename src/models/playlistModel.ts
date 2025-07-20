'use server'

import { getCookie } from "@/actions/cookies/cookieHelper";
import { DEFAULT_KV_EXPIRATION, PLAYLIST_KV_CACHE } from "@/const";
import { randomPlaylist, randomPlaylists } from "@/lib/dev/playlistsGenerator"
import { client } from "@/sanity/lib/client";
import { PLAYLIST_SUMMARY_LIST_QUERY, PROJECTS_BY_SLUGS_QUERY, SINGLE_PLAYLIST_QUERY } from "@/sanity/lib/queries";
import { CategorisedProject, Playlist, PlaylistsSummary } from "@/sanity/schema/schema-types"
import { getCloudflareContext } from "@opennextjs/cloudflare";

class PlaylistModel {
  private playlistKv: KVNamespace<string>

  constructor() {
    this.playlistKv = getCloudflareContext().env.PLAYLIST_KV_CACHE;
  }
  async getPlaylistsSummary(): Promise<PlaylistsSummary | null> {
    console.log("Fetching playlists summary from Sanity...");
    if (process.env.NODE_ENV !== 'production') {
      return randomPlaylists;
    }

    const playlistSummary = await this.playlistKv
      .get<PlaylistsSummary>(PLAYLIST_KV_CACHE.PLAYLIST_SUMMARY, { type: 'json' })

    if (playlistSummary) {
      console.log("Found playlists summary in KV cache.");
      return playlistSummary;
    }

    const playlistSummarySanity = await client.fetch<PlaylistsSummary>(PLAYLIST_SUMMARY_LIST_QUERY, {})

    getCloudflareContext().ctx.waitUntil(
      this.playlistKv.put(
        PLAYLIST_KV_CACHE.PLAYLIST_SUMMARY,
        JSON.stringify(playlistSummarySanity),
        { expirationTtl: DEFAULT_KV_EXPIRATION }
      )
    );
    console.log("Fetched playlists summary from Sanity and stored in KV cache.");
    return playlistSummarySanity;
  }

  async getPlaylist(playlistSlug: string): Promise<Playlist | null> {
    if (process.env.NODE_ENV !== 'production') {
      return randomPlaylist
    }
    const kv = await this.getKvNamespace(); 
    const PLAYLIST_CACHE_KEY = `${PLAYLIST_KV_CACHE.PLAYLIST}:${playlistSlug}`;

    const cachedPlaylist = await kv.get<Playlist>(PLAYLIST_CACHE_KEY, { type: 'json' });
    if (cachedPlaylist) {
      console.log("Found playlist in KV cache.");
      return cachedPlaylist;
    }

    const playlists = await client.fetch<Playlist | null>(SINGLE_PLAYLIST_QUERY, {
      slug: playlistSlug
    })

    if (!playlists) {
      console.log("No playlist found for slug:", playlistSlug);
      return null;
    }

    getCloudflareContext().ctx.waitUntil(
      kv.put(
        PLAYLIST_CACHE_KEY,
        JSON.stringify(playlists),
        { expirationTtl: DEFAULT_KV_EXPIRATION }
      )
    );
    console.log("Stored playlist in KV cache:", playlistSlug);
    return playlists
  }


  // unique to the user, caching wont work here
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

  private async getKvNamespace(): Promise<KVNamespace<string>> {
    const context = await getCloudflareContext({async: true});
    return context.env.PLAYLIST_KV_CACHE;
  }
}

export { PlaylistModel }