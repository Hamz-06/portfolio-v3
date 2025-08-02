'use client'
import { useCurrentProject } from "@/redux/slice/projectDataSlice"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"


//TODO: Add type safety for the regex
const PORTFOLIO_DETAIL_REGEX = /^\/portfolio\/(projects|work_experience|blogs|education)\/[^/]+$/;

function DisplayCurrentProject() {
  const currentProject = useCurrentProject()
  const router = useRouter()
  const pathname = usePathname()

  const onClick = () => {
    const isProjectPage = PORTFOLIO_DETAIL_REGEX.test(pathname)

    if (!currentProject || isProjectPage) return
    router.push(`/portfolio/${currentProject.project_type}/${currentProject.slug}`)
  }

  if (!currentProject) return <></>
  return (
    <div className="items-center hidden sm:flex w-1/3">
      <Image
        onClick={onClick}
        src={currentProject.first_image_url || '/placeholder.svg'}
        alt="Album cover"
        width={56}
        height={56}
        className="w-[56px] h-[56px] object-cover rounded mr-3 flex-none hover:cursor-pointer"
      />
      <div >
        <div
          onClick={onClick}
          className="text-sm font-medium text-[#1ed760] line-clamp-2 pr-10 hover:underline hover:cursor-pointer">{currentProject.title}</div>
        {/* potentially change subtitle */}
        <div
          onClick={onClick}
          className="text-xs text-zinc-400 hover:underline hover:cursor-pointer">{currentProject.project_type}</div>
      </div>
    </div>

  )
}
export { DisplayCurrentProject }