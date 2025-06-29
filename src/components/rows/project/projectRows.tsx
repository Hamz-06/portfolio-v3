'use client'
import { Button } from "@/components/ui/button"
import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { setSelectedCategory, useSelectedCategory } from "@/redux/slice/projectListSlice"
import { ProjectTypes } from "@/types/projects/projects"
import { useDispatch } from "react-redux"

type ProjectRowsProps = {
  title: string
  children: React.ReactNode
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
  console.log(selectedCategory)
  return (
    <section className="mb-8 w-full overflow-auto pl-7">

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-2xl z-10 font-bold pl-3">{capitalizeFirstLetter(title)}</h2>
        <Button
          onClick={() => updateProjects(title as ProjectTypes)}
          className="text-sm font-medium text-zinc-400 hover:underline z-10">
          See all
        </Button>
      </div>


      {/* render the children in a grid layout if category is selected */}
      <div
        className={cn(
          selectedCategory
            ? "grid gap-4 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6"
            : "grid gap-2 grid-flow-col auto-cols-[50%] sm:auto-cols-[21%] 2xl::auto-cols-[17%] h-full overflow-auto"
        )}
      >
        {children}
      </div>


    </section>

  )
}
export { ProjectRows }