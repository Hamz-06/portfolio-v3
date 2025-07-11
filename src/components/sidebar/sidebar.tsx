'use client'
import { cn } from "@/lib/utils"
import { SidebarHeader } from "./sidebarHeader"
import { SidebarSearch } from "./sidebarSearch"
import { PlaylistList } from "../list/playlist/playlistList"

type SideBarProps = {
  className: string
}

export function SideBar({ className }: SideBarProps) {

  return (
    <div className={cn(className, 'group/sidebar')}>
      {/* Library Header */}
      <SidebarHeader />

      {/* Search and Sort */}
      <SidebarSearch />

      {/* Library Items */}
      <PlaylistList />
    </div>
  )
}

