'use client'

import { ProjectCard } from "@/components/cards/projectCard";
import { ProjectRows } from "@/components/grid/portfolio/projectRows";
import { setProjectsList, useProjectsMappedByCategory, useSelectedCategory } from "@/redux/slice/projectDataSlice";
import { CategorisedProjects } from "@/sanity/schema/schema-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


type ProjectListProps = {
  projectSummary: CategorisedProjects
}
export function ProjectList({ projectSummary }: ProjectListProps) {
  const selectedCategory = useProjectsMappedByCategory() || projectSummary
  const category = useSelectedCategory()
  const dispatch = useDispatch()

  useEffect(() => {
    // sets the projects list in the redux store to allow it to be manipulated
    dispatch(setProjectsList(projectSummary))
  }, [])

  return (
    <div className="p-2">
      {Object.entries(selectedCategory).map(([key, value]) => {
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
