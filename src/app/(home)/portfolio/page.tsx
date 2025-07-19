
import { ResizableLayout } from "@/components/layout/resizableLayout";
import { ProjectMainPage } from "@/components/layout/portfolio/projectMainPage";
import { Suspense } from "react";


export default async function Home() {

  return (

    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black">
      {/* takes into account the secondary header height on mobile */}
      <div
        className="w-full h-[calc(100%-var(--mobile-secondary-header-height))] sm:h-full relative overflow-auto"
        id='main-content'>
        {/* //TODO: fix this  */}
        <Suspense fallback={<div>LOOOOL</div>}>
          <ProjectMainPage />
        </Suspense>
      </div>
    </ResizableLayout>

  );
}



