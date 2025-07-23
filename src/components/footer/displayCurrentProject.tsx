'use client'
import { useCurrentProject } from "@/redux/slice/projectDataSlice"
import Image from "next/image"


function DisplayCurrentProject() {
  const currentProject = useCurrentProject()

  if (!currentProject) return <></>
  return (
    <>

      {/* used for desktop view */}
      <div className="items-center hidden sm:flex w-1/3">
        <Image
          src={currentProject.first_image_url || '/placeholder.svg'}
          alt="Album cover"
          width={56}
          height={56}
          className="w-[56px] h-[56px] object-cover rounded mr-3 flex-none"
        />
        <div>
          <div className="text-sm font-medium text-[#1ed760] line-clamp-2 pr-10">{currentProject.title}</div>
          {/* potentially change subtitle */}
          <div className="text-xs text-zinc-400">{currentProject.project_type}</div>
        </div>
      </div>

    </>
  )
}
export { DisplayCurrentProject }