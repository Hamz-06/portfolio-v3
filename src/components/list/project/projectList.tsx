'use client'
import { ProjectCard } from "@/components/cards/portfolio/projectCards";
import { ProjectRows } from "@/components/rows/project/projectRows";
import { useProjectsList } from "@/redux/slice/projectListSlice";

export function ProjectList() {
  const projects = useProjectsList()

  return (
    <div className="p-2">
      {Object.entries(projects).map(([key, value]) => (
        <ProjectRows
          key={key}
          title={key}
        >
          {value?.map((item, idx) => (
            <ProjectCard
              key={`${idx}:${item.slug}`}
              cardDetails={item}
            />
          ))}
        </ProjectRows>
      ))}
      {Object.entries(projects).map(([key, value]) => (
        <ProjectRows
          key={key}
          title={key}
        >
          {value?.map((item, idx) => (
            <ProjectCard
              key={`${idx}:${item.slug}`}
              cardDetails={item}
            />
          ))}
        </ProjectRows>
      ))}
    </div>
  );
}
