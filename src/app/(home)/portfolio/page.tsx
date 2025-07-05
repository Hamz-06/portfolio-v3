import { getCookie } from "@/actions/server-actions/cookies/cookieHelper";
// import { SpotifyWrappedCard } from "@/components/cards/portfolio/spotifyWrappedCard";
import { ToggleSideBar } from "@/components/cards/portfolio/toggleSideBar";
import { FilterBar } from "@/components/filter/filterRow";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";



export default async function Home() {
  // const projects = await getAllProjects()
  const mainPageLayout = await getCookie<number[] | null>('react-resizable-panels:layout')

  return (
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
  );
}
