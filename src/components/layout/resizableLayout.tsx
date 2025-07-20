'use client'

import { setClientCookie } from "@/actions/cookies/cookieHelperClient";
import { SidebarHandle } from "@/components/sidebar/sideBarHandle";
import { SideBar } from "@/components/sidebar/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useToggleSidebar } from "@/redux/slice/layoutSlice";
import clsx from "clsx";
import React from 'react'

type ResizableLayoutProps = {
  className: string;
  children: React.ReactNode;
  defaultLayout?: number[];
}
function ResizableLayout({ className, defaultLayout = [20, 80], children }: ResizableLayoutProps) {
  const toggleSidebar = useToggleSidebar()
  // todo: make this to  const file
  const SIDE_BAR_MAX_SIZE_IN_PERCENT = 32;

  const onLayout = (sizes: number[]) => {
    setClientCookie(`react-resizable-panels:layout`, sizes)
  };

  return (
    <div className={clsx(className)}>
      <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
        {/* Sidebar - Resizable */}
        <SidebarHandle />
        {
          toggleSidebar && <>
            <ResizablePanel
              id='sidebar'
              order={1}

              collapsible={true}
              minSize={20}
              maxSize={SIDE_BAR_MAX_SIZE_IN_PERCENT}
              defaultSize={defaultLayout[0]}
              className="hidden lg:block">

              <SideBar className="flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1" />
            </ResizablePanel>
            <ResizableHandle />
          </>
        }


        {/* Main content - Resizable */}
        <ResizablePanel
          // minSize={75}
          defaultSize={defaultLayout[1]}
          order={2}
          className="flex-1 mr-2 ml-2 sm:ml-1 gap-2 rounded-2xl bg-zinc-900">
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    </div >
  )
}

export { ResizableLayout }
