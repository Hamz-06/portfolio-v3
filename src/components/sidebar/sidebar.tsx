'use client'
import { cn } from "@/lib/utils"
import { SidebarHeader } from "./sidebarHeader"
import { SidebarSearch } from "./sidebarSearch"
import { PlaylistList } from "../list/playlist/playlistList"
import { setMobileToggleSidebar, useMobileToggleSidebar, useToggleSidebar }
  from "@/redux/slice/layoutSlice"
import { ResizableHandle, ResizablePanel } from "../ui/resizable"
import { GenericModal } from "../modal/genericModal"
import { useDispatch } from "react-redux"


type SideBarProps = {
  defaultLayout: number[];
  isMobile: boolean
}

export function SideBar({ defaultLayout, isMobile }: SideBarProps) {
  const toggleSidebar = useToggleSidebar()
  const toggleMobileSidebar = useMobileToggleSidebar()
  const dispatch = useDispatch()
  // todo: make this to  const file
  const SIDE_BAR_MAX_SIZE_IN_PERCENT = 32;

  if (isMobile && toggleMobileSidebar) {
    return (
      <GenericModal
        className="h-[80%] bg-zinc-800 overflow-scroll border-0 z-999"
        title="Projects Library"
        isOpen={toggleMobileSidebar}
        onModal={() => dispatch(setMobileToggleSidebar(!toggleMobileSidebar))}>
        <div className="overflow-auto">
          <div className="h-12 flex items-center justify-center text-white mb-5">
            <h1 className=" font-light">Your Playlist</h1>
          </div>
          <PlaylistList />
        </div>
      </GenericModal>
    );
  }

  if (toggleSidebar) return (<>
    <ResizablePanel
      id='sidebar'
      order={1}
      collapsible={true}
      minSize={20}
      maxSize={SIDE_BAR_MAX_SIZE_IN_PERCENT}
      defaultSize={defaultLayout[0]}
      className="hidden lg:block">

      <div className={cn('flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1 group/sidebar')}>
        {/* Library Header */}
        <SidebarHeader />

        {/* Search and Sort */}
        <SidebarSearch />

        {/* Library Items */}
        <PlaylistList />
      </div>
    </ResizablePanel>
    <ResizableHandle />
  </>
  )

}

