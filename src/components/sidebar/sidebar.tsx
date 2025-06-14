

import Image from "next/image"
import Link from "next/link"
import { Search, Plus, Expand, List } from "lucide-react"
import { cn } from "@/lib/utils"


interface PortfolioItem {
  id: string
  title: string
  type: "playlist" | "album" | "artist" | "single" | 'lifestyle'
  description?: string
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
  },
  {
    id: "top-2022",
    title: "Your Top Songs 2022",
    type: "playlist",
    imageUrl: "",
  }
]

export default function SideBar({ className }: SideBarProps) {
  console.log("Sidebar Rendered")
  return (
    // <div className="flex flex-col h-full bg-black text-white">

    <div className={cn(className)}>
      {/* Library Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Your Library</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-zinc-800">
            <Plus className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-zinc-800">
            <Expand className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex items-center justify-between px-4 pb-2">
        <button className="p-2 rounded-full hover:bg-zinc-800">
          <Search className="h-5 w-5 text-zinc-400" />
        </button>
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span>Recents</span>
          <List className="h-5 w-5" />
        </div>
      </div>

      {/* Library Items */}
      <div className="flex-1 overflow-y-auto px-2">
        {libraryItems.map((item) => (
          <Link
            key={item.id}
            href={`/${item.type}/${item.id}`}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden">
              <Image
                src={item.imageUrl || "/bart-simpson-cartoon.png"}
                alt={item.title}
                fill
                className={cn(
                  "object-cover",
                  item.type === "artist" && "rounded-full",
                  item.type !== "artist" && "rounded",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium truncate">{item.title}</h3>
              <p className="text-xs text-zinc-400 truncate">
                {item.type === "artist" ? (
                  "Artist"
                ) : (
                  <>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    {item.description && ` • ${item.description}`}
                  </>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Button (Mobile) */}
      <div className="p-4 md:hidden">
        <button className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-zinc-800 rounded-full hover:bg-zinc-700">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Create</span>
        </button>
      </div>
    </div>

  )
}
