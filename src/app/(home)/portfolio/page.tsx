import { HomeRouteResponse } from "@/app/(api)/api/home/route";
import { ProjectList } from "@/components/list/project/projectList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SanityHomeQuery } from "@/types/projects/projects";
import { DashboardProvider } from "@/redux/provider/projectListProvider";
// import { ProjectListWrapper } from "@/zustand/wrapper/projectListWrapper";


export default async function Home() {

  const projects = await getAllProjects()

  return (
    <ScrollArea className="px-6 py-6 w-full h-full overflow-auto">
      <DashboardProvider projects={projects}>
        <ProjectList />
      </DashboardProvider>
    </ScrollArea>
  );
}

async function getAllProjects(): Promise<SanityHomeQuery> {
  const res = await fetch(`${process.env.HOST_URL}/api/home`)
  if (!res.ok) {
    console.error("Failed to fetch project data", res.statusText);
    throw new Error("Failed to fetch project data");
  }
  return await res.json() as HomeRouteResponse;
}

