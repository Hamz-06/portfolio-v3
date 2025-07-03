import { getCookie } from "@/actions/server-actions/cookies/cookieHelper";
// import { SpotifyWrappedCard } from "@/components/cards/portfolio/spotifyWrappedCard";
import { ToggleSideBar } from "@/components/cards/portfolio/toggleSideBar";
import { FilterBar } from "@/components/filter/filterRow";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";

export const MAIN_CONTENT_ID = 'main-content';
export default async function Home() {

  const mainPageLayout = await getCookie<number[] | null>('react-resizable-panels:layout')
  // const isShufflingEnabled = await getCookie<boolean>('is-shuffling-enabled');
  return (
    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black"
      defaultLayout={mainPageLayout || undefined}>

      {/* takes into account the secondary header height on mobile */}
      <div className="w-full h-[calc(100%-var(--mobile-secondary-header-height))] sm:h-full relative overflow-auto" id={MAIN_CONTENT_ID}>
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
  );
}



