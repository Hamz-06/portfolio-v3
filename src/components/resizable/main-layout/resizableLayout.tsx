'use client'

import SideBar from "@/components/sidebar/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useToggleSidebar } from "@/redux/slice/layoutSlice";
// import { useToggleSidebar } from "@/redux/slice/layoutSlice";
import clsx from "clsx";
import React from 'react'

type ResizableLayoutProps = {
  className: string;
  children: React.ReactNode;
  defaultLayout?: number[];
}
function ResizableLayout({ className, defaultLayout = [25, 75], children }: ResizableLayoutProps) {
  const toggleSidebar = useToggleSidebar()

  // todo: Potential refactor
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  // console.log("toggleMenu", toggleMenu)
  return (
    <div className={clsx(className)}>
      <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
        {/* Sidebar - Resizable */}

        {
          toggleSidebar && <>
            <ResizablePanel
              // onResize={(e) => { console.log(e) }}
              id='sidebar'
              order={1}

              collapsible={true}
              minSize={20}
              maxSize={25}
              defaultSize={defaultLayout[0]}
              className="hidden lg:block">

              <SideBar className="flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1" />
            </ResizablePanel>
            <ResizableHandle />
          </>
        }


        {/* Main content - Resizable */}
        <ResizablePanel
          minSize={75}
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
