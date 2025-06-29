import { FilterBar } from "@/components/filter/filterRow";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";

export default async function Home() {

  return (
    <ResizableLayout className="flex flex-1 overflow-hidden relative bg-black">
      {/* <ScrollArea className="px-6 py-6 w-full h-full overflow-auto"> */}
      {/* mr-2 ml-2 sm:ml-1 gap-2 rounded-2xl bg-zinc-900 */}
      <div className="sticky top-0 bg-amber-600 h-12">
        <FilterBar />
      </div>

      <div className="w-full h-[calc(100%-3rem)] p-2 overflow-auto">
        <ProjectList />
      </div>
      {/* </ScrollArea> */}
    </ResizableLayout>
  );
}



