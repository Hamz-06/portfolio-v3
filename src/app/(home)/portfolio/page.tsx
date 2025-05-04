import { ProjectList } from "@/components/list/project/projectList";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { ProjectListWrapper } from "@/zustand/wrapper/projectListWrapper";


export default async function Home() {

  return (
    <ScrollArea className="px-6 py-6 w-full h-full overflow-auto">
      <ProjectList />
    </ScrollArea>
  );
}



