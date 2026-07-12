'use client'
import { cn } from "@/lib/utils"
import { SidebarHeader } from "./sidebarHeader"
import { SidebarSearch } from "./sidebarSearch"
import { PlaylistList } from "../list/playlist/playlistList"
import { useToggleSidebar, setToggleSidebar }
  from "@/zustand/toggleSidebar"
import { ResizableHandle, ResizablePanel } from "../ui/resizable"
import { Library } from "lucide-react"
import ToolTip from "../tooltip/tooltip"


type SideBarProps = {
  defaultLayout: number[];
}

export function SideBar({ defaultLayout }: SideBarProps) {
  const toggleSidebar = useToggleSidebar()
  const SIDE_BAR_MAX_SIZE_IN_PERCENT = 25;


  if (toggleSidebar) return (<>
    <ResizablePanel
      id='sidebar'
      order={1}
      collapsible={false}
      minSize={20}
      maxSize={SIDE_BAR_MAX_SIZE_IN_PERCENT}
      defaultSize={defaultLayout[0]}
      className="hidden lg:block">

      <div className={cn('flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1 group/sidebar')}>
        <SidebarHeader />
        <SidebarSearch />
        <PlaylistList />
      </div>
    </ResizablePanel>
    <ResizableHandle />
  </>
  )

  // Collapsed / condensed sidebar view for desktop
  return (
    <div className="hidden lg:flex flex-col w-[72px] shrink-0 h-full bg-zinc-900 rounded-2xl ml-2 mr-2 py-4 items-center gap-4">
      <ToolTip tooltipContent="Expand My Library">
        <button
          onClick={() => setToggleSidebar(true)}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Expand My Library"
        >
          <Library className="w-6 h-6" />
        </button>
      </ToolTip>
    </div>
  )
}

