
import { getCookie } from "@/actions/cookies/cookieHelper";
import { SideBar } from "@/components/sidebar/sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { isSmallScreen } from "@/lib/utils";
import { getPlaylistsSummary } from "@/models/playlistModel";
import { SidebarProvider } from "@/redux/provider/sidebarProvider";
import { UserDeviceCookie, UserDeviceValue } from "@/types/cookieTypes";
import clsx from "clsx";
import React from 'react'
import { SidebarHandle } from "../sidebar/sideBarHandle";

type ResizableLayoutProps = {
  className: string;
  children: React.ReactNode;
}
async function ResizableLayout({ className, children }: ResizableLayoutProps) {
  const DEFAULT_LAYOUT = [20, 80];

  //todo: use promise.all

  const layoutPanes = await getCookie<number[] | null>('react-resizable-panels-layout') || DEFAULT_LAYOUT;
  const playlists = await getPlaylistsSummary() || [];
  const deviceType = await getCookie<UserDeviceCookie>('user-device');

  //TODO: move all cookie logic to a separate function
  const device: UserDeviceValue = deviceType ? deviceType['device-type'] : 'desktop';
  const isMobileDevice = isSmallScreen(device)


  return (
    <ResizablePanelGroup className={clsx(className)} direction="horizontal">
      {/* Sidebar - Resizable */}
      <SidebarHandle isMobile={isMobileDevice} />

      <SidebarProvider
        toggleMobileSidebar={false} // by default false
        playlists={playlists}>
        <SideBar
          defaultLayout={layoutPanes}
          isMobile={isMobileDevice} />
      </SidebarProvider>

      {/* Main content - Resizable */}
      <ResizablePanel
        // minSize={75}
        id='main-content'
        defaultSize={layoutPanes[1]}
        order={2}
        // className="flex-1 mr-2 ml-2 sm:ml-1 gap-2 rounded-2xl bg-zinc-900 relative">
        className="flex-1 relative">
        {children}
      </ResizablePanel>

    </ResizablePanelGroup>

  )
}

export { ResizableLayout }
