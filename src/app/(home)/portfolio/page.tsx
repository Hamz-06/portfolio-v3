import { getCookie } from "@/actions/cookies/cookieHelper";
import { PlaylistsResponse } from "@/app/api/playlist/route";
import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/layout/resizableLayout";
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
            <FilterBarHeader />
          </div>
          <ProjectList />
        </div>

      </ResizableLayout>
    </HomeProvider>
  );
}

const getPlaylists = async () => {
  const res = await fetch(`${process.env.HOST_URL}/api/playlist`)
  if (!res.ok) {
    throw new Error('Failed to fetch playlists');
  }
  const data = await res.json();
  return data as PlaylistsResponse;
}

