'use client'

import SideBar from "@/components/sidebar/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useToggleSidebar } from "@/redux/slice/layoutSlice";
import clsx from "clsx";
import React from 'react'

type ResizableLayoutProps = {
  className: string;
  children: React.ReactNode;
}
function ResizableLayout({ className, children }: ResizableLayoutProps) {
  const toggleMenu = useToggleSidebar()


  return (
    <div className={clsx(className)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar - Resizable */}

        {
          toggleMenu && <ResizablePanel
            // onResize={(e) => { console.log(e) }}
            collapsible={true}
            defaultSize={20}
            minSize={20}
            maxSize={25}
            className="hidden lg:block">

            <SideBar className="flex-col h-full bg-zinc-900 p-3 gap-2 rounded-2xl ml-2 mr-1" />
          </ResizablePanel>
        }

        <ResizableHandle />

        {/* Main content - Resizable */}
        <ResizablePanel className="flex-1 mr-2 ml-2 sm:ml-1 gap-2 rounded-2xl bg-zinc-900">
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  )
}

export { ResizableLayout }
