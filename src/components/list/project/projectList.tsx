'use client'

import { ProjectCard } from "@/components/cards/projectCard";
import { ProjectRows } from "@/components/grid/portfolio/projectRows";
import { setProjects, useProjects, useSelectedCategory } from "@/redux/slice/projectDataSlice";
import { CategorisedProjects, ProjectTypes } from "@/sanity/schema/schema-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// TODO: instead of querying a map object in sanity, query an array so it can be sorted on query time
const PROJECT_RENDER_ORDER: ProjectTypes[] = [
  "projects",
  "work_experience",
  "education",
  "blogs"
]

type ProjectListProps = {
  projectSummary: CategorisedProjects
}
export function ProjectList({ projectSummary }: ProjectListProps) {
  const selectedCategory = useProjects() || projectSummary
  const category = useSelectedCategory()
  const dispatch = useDispatch()

  useEffect(() => {
    // sets the projects list in the redux store to allow it to be manipulated
    dispatch(setProjects(projectSummary))
  }, [])

  return (
    <div className="p-2 scrollable-content">
      {PROJECT_RENDER_ORDER.map((key) => {
        const value = selectedCategory[key]
        if (!value || value.length === 0) return null
        if (category && category !== key) return null

        return (
          <ProjectRows key={key} title={key}>
            {value.map((item, idx) => (
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
