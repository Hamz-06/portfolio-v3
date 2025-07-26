'use client'
import { Button } from "@/components/ui/button"
import { capitalizeFirstLetter, cn, underscoreToSpace } from "@/lib/utils"
import { setSelectedCategory, useSelectedCategory } from "@/redux/slice/projectDataSlice"
import { ProjectTypes } from "@/sanity/schema/schema-types"
import { useDispatch } from "react-redux"

type ProjectRowsProps = {
  title: string
  children: React.ReactNode
}
//TODO: move this to sanity load dynamically
const TITLE_TAG_LINE: Record<ProjectTypes, string> = {
  blogs: 'Throw back',
  projects: 'Made for you',
  work_experience: 'Chart topper'
}
const titleTagLine = (title: ProjectTypes) => {
  return TITLE_TAG_LINE[title] || 'Welcome to my portfolio'
}

function ProjectRows({
  title,
  children,
}: ProjectRowsProps) {
  const selectedCategory = useSelectedCategory()
  const dispatch = useDispatch();

  const updateProjects = (title: ProjectTypes) => {
    if (selectedCategory === title) {
      dispatch(setSelectedCategory(null))
      return
    }
    dispatch(setSelectedCategory(title))
  }
  const tagline = titleTagLine(title as ProjectTypes)

  return (
    <section className="mb-8 w-full mt-10 overflow-auto p-0 sm:pl-7 scrollable-content">
      <div className="mb-2 flex items-center justify-between">
        <div className="pl-3">
          <h6 className="font-light text-xs text-zinc-400">{tagline}</h6>
          <h2 className="text-2xl font-bold">{underscoreToSpace(capitalizeFirstLetter(title))}</h2>
        </div>
        <Button
          onClick={() => updateProjects(title as ProjectTypes)}
          className="text-sm text-zinc-400 hover:underline font-bold">
          Show All
        </Button>
      </div>


      {/* render the children in a grid layout if category is selected */}
      {/* todo not centred on mobile  */}
      <div
        className={cn(
          selectedCategory
            ? "flex flex-wrap gap-3 px-4 sm:px-0"
            : "grid grid-flow-col auto-cols-max gap-4 overflow-x-auto"
        )}
      >
        {children}
      </div>
    </section>

  )
}
export { ProjectRows }