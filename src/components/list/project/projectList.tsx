'use client'
import { ProjectCard } from "@/components/cards/portfolio/projectCards";
import { FilterBar } from "@/components/filter/filterRow";
import { ProjectRows } from "@/components/rows/project/projectRows";
import { useProjectsList } from "@/redux/slice/projectListSlice";

export function ProjectList() {
  const projects = useProjectsList()

  return (
    <>
      <div className="mb-6">
        <FilterBar />
      </div>

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
    </>
  );
}
