'use client'
import { Button } from "@/components/ui/button"
import { setSelectedCategory } from "@/redux/slice/projectListSlice"
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
  const dispatch = useDispatch();

  const updateProjects = (title: ProjectTypes) => {
    dispatch(setSelectedCategory([title]))
  }
  return (
    <section className="mb-8 w-full overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={() => updateProjects(title as ProjectTypes)} className="text-sm font-medium text-zinc-400 hover:underline">
          See all
        </Button>
      </div>
      <div className="grid gap-2 grid-flow-col auto-cols-[50%] sm:auto-cols-[21%] h-full overflow-auto">
        {children}
      </div>
    </section>

  )
}
export { ProjectRows }