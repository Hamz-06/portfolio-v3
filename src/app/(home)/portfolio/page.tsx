import { getCookie } from "@/actions/server-actions/cookies/cookieHelper";
import { ToggleSideBar } from "@/components/cards/portfolio/toggleSideBar";
import { FilterBar } from "@/components/filter/filterRow";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";
import clsx from "clsx";

export const MAIN_CONTENT_ID = 'main-content';
export default async function Home() {

  const mainPageLayout = await getCookie<number[] | null>('react-resizable-panels:layout')

  return (
    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black"
      defaultLayout={mainPageLayout || undefined}>

      <div className="w-full h-full relative overflow-auto" id={MAIN_CONTENT_ID}>
        <div className="sticky top-0 z-10 h-16">
          <FilterBar />
        </div>

        <div className={clsx("absolute top-0 left-0  w-full h-40 pointer-events-none",
          "bg-gradient-to-t from-transparent  to-blue-800"
        )} />
        <ProjectList />
      </div>
      <ToggleSideBar />
    </ResizableLayout>
  );
}



