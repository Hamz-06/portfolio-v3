import { Playlist, PlaylistsSummary } from "@/sanity/schema/schema-types";
import { sleep } from "../utils";

const DELAY_CALL_DEV_TEST = 0

export const randomPlaylistsSummary = async (): Promise<PlaylistsSummary> => {
  if (process.env.THROTTLE_REQUEST) {
    await sleep(DELAY_CALL_DEV_TEST)
  }
  return [
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
  ];
}

export const randomPlaylist = async (): Promise<Playlist> => {
  if (process.env.THROTTLE_REQUEST) {
    await sleep(DELAY_CALL_DEV_TEST)
  }
  return {
    playlist: Array.from({ length: 10 }, (_, i) => ({
      title: `Project ${i + 1}`,
      first_image_url: "/mona-lisa.png",
      slug: `project-${i + 1}`,
      sub_title: `Sub Title ${i + 1}`,
      project_type: "projects"
    })),
    playlist_name: "Sample Playlist",
    slug: "sample-playlist",
    description: "Sample playlist description",
    pinned: true,
    type: "aws",
    playlist_cover_image: "/bart-simpson-cartoon.png"
  }
}
