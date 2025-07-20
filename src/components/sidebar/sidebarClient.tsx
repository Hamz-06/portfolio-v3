'use client'
import { useToggleSidebar } from '@/redux/slice/layoutSlice';
import React from 'react'
import { ResizableHandle, ResizablePanel } from '../ui/resizable';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './sidebarHeader';
import { SidebarSearch } from './sidebarSearch';
import { PlaylistList } from '../list/playlist/playlistList';

type SideBarProps = {
  className: string;
  defaultLayout: number[];
}

function SidebarClient({ className, defaultLayout }: SideBarProps) {
  const toggleSidebar = useToggleSidebar()
  console.log("toggleSidebar", toggleSidebar)
  // todo: make this to  const file
  const SIDE_BAR_MAX_SIZE_IN_PERCENT = 32;

  if (!toggleSidebar) {
    return null;
  }
  return (
    <>
      <ResizablePanel
        id='sidebar'
        order={1}
        collapsible={true}
        minSize={20}
        maxSize={SIDE_BAR_MAX_SIZE_IN_PERCENT}
        defaultSize={defaultLayout[0]}
        className="hidden lg:block">

        <div className={cn(className, 'group/sidebar')}>
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

export { SidebarClient }