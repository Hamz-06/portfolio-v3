'use client'
import { useCurrentProject } from "@/redux/slice/projectListSlice"
import Image from "next/image"

function DisplayCurrentProject() {
  const currentProject = useCurrentProject()
  if (!currentProject) return <></>
  return (
    <>
      <Image
        src={currentProject.first_image_url}
        alt="Album cover"
        width={56}
        height={56}
        className="w-[56px] h-[56px] object-cover rounded mr-3"
      />
      <div>
        <div className="text-sm font-medium">{currentProject.title}</div>
        {/* potentially change subtitle */}
        <div className="text-xs text-zinc-400">{currentProject.project_type}</div>
      </div>
    </>
  )
}
export { DisplayCurrentProject }