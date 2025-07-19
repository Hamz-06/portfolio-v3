
import { ResizableLayout } from "@/components/layout/resizableLayout";
import { ProjectMainPage } from "@/components/layout/portfolio/projectMainPage";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";


export default function Home() {

  return (

    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black">
      {/* takes into account the secondary header height on mobile */}
      <div
        className="w-full h-[calc(100%-var(--mobile-secondary-header-height))] sm:h-full relative overflow-auto"
        id='main-content'>
        {/* move the skeleton loading to another file */}
        <Suspense
          fallback={
            <Skeleton className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <LoaderCircle className="animate-spin" />
            </Skeleton>
          }>
          <ProjectMainPage />
        </Suspense>

      </div>
    </ResizableLayout>

  );
}



