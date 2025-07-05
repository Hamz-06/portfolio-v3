'use client'
import { useCurrentProject } from "@/redux/slice/projectDataSlice"
import { Routes } from "@/types/routes";
import Image from "next/image"
import { usePathname } from "next/navigation"

// todo: split the component into two parts, one for mobile and one for desktop

const HOME_PAGE_ROUTE: Routes = '/portfolio';


function DisplayCurrentProject() {
  const currentProject = useCurrentProject()
  const pathname = usePathname();

  const isHomePage = pathname === HOME_PAGE_ROUTE;

  if (!currentProject) return <></>
  return (
    <>
      {/* used for mobile view so it sits above the controls -translate-y-[var(--desktop-footer-height)]  */}
      {isHomePage && <div className="absolute w-full h-[var(--mobile-secondary-header-height)] left-0 bottom-0 -translate-y-[var(--desktop-footer-height)] rounded-b-sm flex bg-zinc-900
        sm:hidden">
        {/* TODO: this component is duplicated in the footer, consider refactoring to a shared component */}
        <div className="h-0.5 -translate-y-0.5 flex-1 bg-zinc-600 absolute top-0 left-0 right-0 z-10">
          <div className="h-0.5 w-1/3 bg-white rounded-r-full" />
        </div>
        {/* current song image  */}
        <div className="h-15 w-15  overflow-hidden p-1">
          <div className="relative w-full h-full">
            <Image
              src={currentProject.first_image_url || '/placeholder.svg'}
              alt="Album cover"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>

        <div className="flex-1 p-2 flex flex-col justify-center ml-3">
          <a className="block font-light text-xs text-[#1ed760]">{currentProject.title}</a>
          <a className="block font-light text-xs text-zinc-400">Mohammad H Iqbal</a>
        </div>
      </div>}

      {/* used for desktop view */}
      <div className="items-center hidden sm:flex w-1/3">
        <Image
          src={currentProject.first_image_url || '/placeholder.svg'}
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
      </div>

    </>
  )
}
export { DisplayCurrentProject }