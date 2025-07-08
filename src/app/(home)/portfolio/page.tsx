import { getCookie } from "@/actions/server-actions/cookies/cookieHelper";
import { PlaylistsResponse } from "@/app/api/playlists/route";
import { ToggleSideBar } from "@/components/cards/portfolio/toggleSideBar";
import { FilterBar } from "@/components/filter/filterRow";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";
import { HomeProvider } from "@/redux/provider/homeProvider";


export default async function Home() {
  const mainPageLayout = await getCookie<number[] | null>('react-resizable-panels:layout')
  const playlists = await getPlaylists()

  return (
    <HomeProvider playlists={playlists}>
      <ResizableLayout
        className="flex flex-1 overflow-hidden relative bg-black"
        defaultLayout={mainPageLayout || undefined}>

        {/* takes into account the secondary header height on mobile */}
        <div
          className="w-full h-[calc(100%-var(--mobile-secondary-header-height))] sm:h-full relative overflow-auto"
          id='main-content'>

          <div className="sticky top-0 z-10 h-16">
            <FilterBar />
          </div>
          {/* <PortfolioColorTint /> */}
          {/* <SocialMediaList /> */}
          {/* <SpotifyWrappedCard /> */}
          <ProjectList />
        </div>
        <ToggleSideBar />
      </ResizableLayout>
    </HomeProvider>
  );
}

const getPlaylists = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/playlists`)
  if (!res.ok) {
    throw new Error('Failed to fetch playlists');
  }
  const data = await res.json();
  return data as PlaylistsResponse;
}

