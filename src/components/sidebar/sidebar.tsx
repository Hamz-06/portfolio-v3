'use client'

import Image from "next/image"
import Link from "next/link"
import { Search, } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { HideSideBarIcon } from "../icons/customIcons"
import ToolTip from "../tooltip/tooltip"
import { useDispatch } from "react-redux"
import { setToggleSidebar } from "@/redux/slice/layoutSlice"


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
  return (
    <div className={cn(className, 'group/sidebar')}>
      {/* Library Header */}
      <Header />

      {/* Search and Sort */}
      <div className="flex items-center justify-between px-4 pb-2">
        <Button className="p-2 rounded-full hover:bg-zinc-800">
          <Search className="h-5 w-5 text-zinc-400" />
        </Button>

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
    </div>
  )
}



const Header = () => {
  const dispatch = useDispatch()

  // todo set the cookies for this sidebar collapse
  const handleCollapse = () => {
    console.log("Collapse Sidebar")
    dispatch(setToggleSidebar(false))
  }
  return (
    <div className="flex items-center justify-between pt-4 pb-2 px-3.5">
      <ToolTip tooltipContent="Collapse Your Library">
        <div
          onClick={handleCollapse}
          className="*:transition-transform *:duration-300 flex fle-col items-center *:cursor-pointer">
          <div
            className="w-7 h-7 flex justify-center items-center group-hover/sidebar:translate-x-0 absolute -translate-x-12 
          hover:text-white text-zinc-400">
            <HideSideBarIcon />
          </div>
          <h2 className="font-medium group-hover/sidebar:translate-x-8">Your Library</h2>
        </div>
      </ToolTip>
    </div>
  )
}