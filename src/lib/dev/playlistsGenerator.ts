import { Playlist, PlaylistsSummary } from "@/sanity/schema/schema-types";
import { projects } from "./projectsGenerator";

export const randomPlaylists: PlaylistsSummary = [
  {
    playlist_length: 10,
    playlist_name: "Sample Playlist",
    pinned: true,
    slug: "sample-playlist",
    description: "AWS playlist",
    type: "aws",
    playlist_cover_image: "/bart-simpson-cartoon.png"
  },
  {
    playlist_length: 5,
    pinned: false,
    playlist_name: "npm-projects",
    slug: "npm",
    description: "npm packages",
    type: "npm",
    playlist_cover_image: "/bart-simpson-cartoon.png"
  }
]

export const randomPlaylist: Playlist = {
  playlist: [projects[0], projects[1]],
  playlist_name: "Sample Playlist",
  slug: "sample-playlist",
  description: "Sample playlist description",
  pinned: true,
  type: "aws",
  playlist_cover_image: "/bart-simpson-cartoon.png"
}
