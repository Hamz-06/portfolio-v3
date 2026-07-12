import { setToggleSidebar } from "@/zustand/toggleSidebar"
import ToolTip from "../tooltip/tooltip"
import { HideSideBarIcon } from "../layout/customIcons"

const SidebarHeader = () => {
  // todo set the cookies for this sidebar collapse
  const handleCollapse = () => {
    setToggleSidebar(false)
  }

  return (
    <div className="flex items-center justify-between pt-4 pb-2 px-3.5 ">
      <div className="flex-1">
        <ToolTip tooltipContent="Collapse My Library">
          <div
            onClick={handleCollapse}
            className="*:transition-transform *:duration-300 flex fle-col items-center *:cursor-pointer">
            <div
              className="w-7 h-7 flex justify-center items-center group-hover/sidebar:translate-x-0 absolute -translate-x-12 
            hover:text-white text-zinc-400">
              <HideSideBarIcon />
            </div>
            <h2 className="font-medium group-hover/sidebar:translate-x-9 truncate">My Library</h2>
          </div>
        </ToolTip>
      </div>
    </div>
  )
}
export { SidebarHeader }