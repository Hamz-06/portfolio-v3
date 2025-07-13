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
  return (
    <section className="mb-8 w-full mt-10 overflow-auto p-0 sm:pl-7">
      <div className="mb-2 flex items-center justify-between">
        <div className="pl-3">
          <h6 className="font-light text-xs text-zinc-400">Made for you</h6>
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