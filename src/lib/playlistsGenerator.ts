import { Playlists } from "@/schema/schema-types";

export const randomPlaylists: Playlists = [
  {
    playlist: [
      {
        title: "Project 1",
        first_image_url: '/bart-simpson-cartoon.png',
        slug: "project-1",
        sub_title: "Sub Title 1",
        project_type: "blogs"
      },
      {
        title: "Project 2",
        first_image_url: "/mona-lisa.png",
        slug: "project-2",
        sub_title: "Sub Title 2",
        project_type: "projects"
      }
    ],
    playlist_name: "Sample Playlist",
    slug: "sample-playlist",
    description: "AWS playlist",
    type: "aws",
    playlist_cover_image: "/bart-simpson-cartoon.png"
  },
  {
    playlist: [
      {
        title: "Project 2",
        first_image_url: "/mona-lisa.png",
        slug: "project-2",
        sub_title: "Sub Title 2",
        project_type: "projects"
      }
    ],
    playlist_name: "npm-projects",
    slug: "npm",
    description: "npm packages",
    type: "npm",
    playlist_cover_image: "/bart-simpson-cartoon.png"
  }
]