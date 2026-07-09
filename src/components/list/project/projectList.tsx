'use client'

import { useTRPC } from "@/backend/trpc/provider";
import { ProjectCard } from "@/components/cards/projectCard";
import { ProjectRows } from "@/components/grid/portfolio/projectRows";
import { ProjectTypes } from "@/sanity/schema/schema-types";
import { useCategoryStore } from "@/store/categoryStore";
import { useQuery } from "@tanstack/react-query";

// TODO: instead of querying a map object in sanity, query an array so it can be sorted on query time
const PROJECT_RENDER_ORDER: ProjectTypes[] = [
  "projects",
  "work_experience",
  "education",
  "blogs"
]

export function ProjectList() {
  const trpc = useTRPC()

  const { data: projectSummary } = useQuery(
    trpc.portfolio.getAllProjectsList.queryOptions()
  )

  const { selectedCategory } = useCategoryStore()

  if (!projectSummary) {
    return null // add skeleton loader here
  }

  const categoriesToRender: ProjectTypes[] = selectedCategory === 'all'
    ? PROJECT_RENDER_ORDER
    : [selectedCategory]

  return (
    <div id='project-scroll' className="p-2 scrollable-content">
      {categoriesToRender.map((key) => {
        const selectedProjects = projectSummary[key]
        if (!selectedProjects || selectedProjects.length === 0) return null

        return (
          <ProjectRows key={key} title={key}>
            {selectedProjects.map((item, idx) => (
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
