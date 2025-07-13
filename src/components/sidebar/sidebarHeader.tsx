import { setToggleSidebar } from "@/redux/slice/layoutSlice"
import { useDispatch } from "react-redux"
import ToolTip from "../tooltip/tooltip"
import { HideSideBarIcon } from "../layout/customIcons"
import { Button } from "../ui/button"
import { Maximize2 } from "lucide-react"

const SidebarHeader = () => {
  const dispatch = useDispatch()

  // todo set the cookies for this sidebar collapse
  const handleCollapse = () => {
    console.log("Collapse Sidebar")
    dispatch(setToggleSidebar(false))
  }

  //todo need to implement expand sidebar
  const expandSideBar = () => {
    console.log("Expand Sidebar")
  }

  return (
    <div className="flex items-center justify-between pt-4 pb-2 px-3.5">
      <div className="flex-1">
        <ToolTip tooltipContent="Collapse Your Library">
          <div
            onClick={handleCollapse}
            className="*:transition-transform *:duration-300 flex fle-col items-center *:cursor-pointer">
            <div
              className="w-7 h-7 flex justify-center items-center group-hover/sidebar:translate-x-0 absolute -translate-x-12 
            hover:text-white text-zinc-400">
              <HideSideBarIcon />
            </div>
            <h2 className="font-medium group-hover/sidebar:translate-x-9 truncate">Your Library</h2>
          </div>
        </ToolTip>
      </div>

      {/* expand  */}
      <ToolTip tooltipContent='Expand sidebar'>
        <Button
          onClick={() => alert('Expand sidebar not implemented yet')}
          variant="ghost"
          asChild
          className="rounded-full p-2 hover:bg-zinc-800"
        >
          <Maximize2 onClick={expandSideBar} className="text-zinc-400 w-9 h-9" />
        </Button>
      </ToolTip>
    </div>
  )
}
export { SidebarHeader }