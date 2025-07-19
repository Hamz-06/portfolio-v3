
import { getCookie } from "@/actions/cookies/cookieHelper";
import { SidebarHandle } from "@/components/sidebar/sideBarHandle";
import { SideBar } from "@/components/sidebar/sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import clsx from "clsx";
import React, { Suspense } from 'react'
import { Skeleton } from "../ui/skeleton";

type ResizableLayoutProps = {
  className: string;
  children: React.ReactNode;
}
async function ResizableLayout({ className, children }: ResizableLayoutProps) {
  const DEFAULT_LAYOUT = [20, 80];
  const layoutPanes = await getCookie<number[] | null>('react-resizable-panels:layout') || DEFAULT_LAYOUT;
  return (
    <div className={clsx(className)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar - Resizable */}
        <SidebarHandle />


        {/* duplicate tailwind css  */}
        <Suspense fallback={
          <Skeleton className="flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1"
            style={{ width: `${layoutPanes[0]}%` }}>
          </Skeleton>
        }>
          <SideBar defaultLayout={layoutPanes} />
        </Suspense>

        {/* Main content - Resizable */}
        <ResizablePanel
          // minSize={75}
          defaultSize={layoutPanes[1]}
          order={2}
          className="flex-1 mr-2 ml-2 sm:ml-1 gap-2 rounded-2xl bg-zinc-900">
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    </div >
  )
}

export { ResizableLayout }
