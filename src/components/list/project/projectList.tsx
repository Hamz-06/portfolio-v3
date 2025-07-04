'use client'
import { ProjectCard } from "@/components/cards/portfolio/projectCards";
import { ProjectRows } from "@/components/grid/project/projectRows";
import { useProjectsMappedByCategory, useSelectedCategory } from "@/redux/slice/projectListSlice";


export function ProjectList() {
  const projects = useProjectsMappedByCategory()
  const category = useSelectedCategory()
  return (
    <div className="p-2">
      {Object.entries(projects).map(([key, value]) => {
        if (category && key !== category) {
          return null;
        }
        return (
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
        )
      })}
    </div>
  );
}
