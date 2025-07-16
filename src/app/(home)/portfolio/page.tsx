import { getCookie } from "@/actions/cookies/cookieHelper";
import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/layout/resizableLayout";
import { HomeProvider } from "@/redux/provider/homeProvider";
import { PlaylistModel } from "@/models/playlistModel";


export default async function Home() {
  const mainPageLayout = await getCookie<number[] | null>('react-resizable-panels:layout')
  const playlists = await new PlaylistModel().getPlaylistsSummary()

  if (!playlists) {
    console.error("Failed to fetch playlists");
    return <div>Error loading playlists</div>;
  }

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
            <FilterBarHeader />
          </div>
          <ProjectList />
        </div>

      </ResizableLayout>
    </HomeProvider>
  );
}

