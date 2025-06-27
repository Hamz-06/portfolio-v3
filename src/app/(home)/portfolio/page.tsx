import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/resizable/main-layout/resizableLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Home() {

  return (
    <ResizableLayout className="flex flex-1 overflow-hidden relative bg-black">
      <ScrollArea className="px-6 py-6 w-full h-full overflow-auto">
        <ProjectList />
      </ScrollArea>
    </ResizableLayout>
  );
}



