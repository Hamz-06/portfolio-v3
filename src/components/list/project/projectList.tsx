'use client'

import { ProjectCard } from "@/components/cards/projectCard";
import { ProjectRows } from "@/components/grid/portfolio/projectRows";
import { useProjectsMappedByCategory, useSelectedCategory } from "@/redux/slice/projectDataSlice";


export function ProjectList() {
  const projects = useProjectsMappedByCategory()
  const category = useSelectedCategory()

  return (
    <div className="p-2">
      {Object.entries(projects).map(([key, value]) => {
        if (category && key !== category) {
          return null;
        }
        if (value.length === 0) {
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
