import { HomeRouteResponse } from "@/app/(api)/api/home/route";
import { ProjectCard } from "@/components/cards/project/projectCards";
import { ProjectRows } from "@/components/rows/project/projectRows";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SanityHomeQuery } from "@/types/projects/projects";



export default async function Home() {
  const projects = await getAllProjects()

  return (
    <>
      <ScrollArea className="px-6 py-6 w-full h-full overflow-auto">
        {
          Object.entries(projects).map(([key, value]) => {
            console.log("key", key)
            console.log("value", value)
            return (
              <ProjectRows
                key={key}
                title={key}
                seeAllHref={`/${key}`}
              >
                <div className="grid gap-2 grid-flow-col auto-cols-[21%] overflow-auto ">
                  {value.map((item, key) => (
                    <ProjectCard
                      key={`${key}:${item.slug}`}
                      cardDetails={item}
                    />
                  ))}
                </div>
              </ProjectRows>
            )
          })
        }
      </ScrollArea>
    </>
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

