import { PlaylistModel } from "@/models/playlistModel";
import { SidebarClient } from "./sidebarClient";
import { SidebarProvider } from "@/redux/provider/sidebarProvider";





type SideBarProps = {
  defaultLayout: number[];
}
export async function SideBar({ defaultLayout }: SideBarProps) {
  //todo: use promise.all
  const playlists = await new PlaylistModel().getPlaylistsSummary() || [];


  return (

    <SidebarProvider playlists={playlists}>
      <SidebarClient className="flex-col h-full bg-zinc-900 rounded-2xl ml-2 mr-1" defaultLayout={defaultLayout} />
    </SidebarProvider>
  )
}

