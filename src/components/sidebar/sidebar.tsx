'use client'

import { cn } from "@/lib/utils"
import { SidebarHeader } from "./sidebarHeader"
import { SidebarSearch } from "./sidebarSearch"
import { useState } from "react"
import { PlaylistList } from "../list/playlist/playlistList"

export interface PortfolioItem {
  id: string
  title: string
  type: "playlist" | "album" | "artist" | "single" | 'lifestyle'
  description?: string
  pinned?: boolean
  imageUrl: string
}

type SideBarProps = {
  className: string
}
const libraryItems: PortfolioItem[] = [
  {
    id: "about-me",
    title: "About Me",
    type: "lifestyle",
    description: "62 songs",
    imageUrl: "",
  },
  {
    id: "liked-projects",
    title: "Liked Projects",
    type: "playlist",
    imageUrl: "",
    pinned: true,
  },
  {
    id: "top-2022",
    title: "Your Top Songs 2022",
    type: "playlist",
    imageUrl: "",
  }
]
export default function SideBar({ className }: SideBarProps) {
  const [queryResults, setQueryResults] = useState<PortfolioItem[]>(libraryItems)

  return (
    <div className={cn(className, 'group/sidebar')}>
      {/* Library Header */}
      <SidebarHeader />

      {/* Search and Sort */}
      <SidebarSearch playlists={libraryItems} setQueryResultValue={setQueryResults} />


      {/* Library Items */}
      <PlaylistList playlistList={queryResults} />
    </div>
  )
}

