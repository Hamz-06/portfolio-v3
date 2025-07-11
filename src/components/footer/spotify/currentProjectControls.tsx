'use client'

import { serverRedirect } from "@/actions/server-actions/redirect";
import ToolTip from "@/components/tooltip/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigateCurrentProject, setShuffle, useCurrentProject, useIsShufflingEnabled } from "@/redux/slice/projectDataSlice";
import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useDispatch } from "react-redux";

export type NavigationStep = 'previous' | 'next';


function ProjectControls() {
  const dispatch = useDispatch()
  const currentProject = useCurrentProject()
  const isShufflingEnabled = useIsShufflingEnabled()

  const navigateCurrentProjectList = (step: NavigationStep) => {
    dispatch(navigateCurrentProject(step))
  }

  const shuffleCurrentProjectList = () => {
    dispatch(setShuffle(!isShufflingEnabled))
  }

  const redirectToProject = () => {
    if (!currentProject) return
    serverRedirect(`/portfolio/${currentProject.project_type}/${currentProject.slug}`)
  }

  return (
    <div className="flex flex-col items-center w-full sm:w-1/3">
      <div className="flex items-center space-x-7 sm:space-x-4">

        <ToolTip tooltipContent="Shuffle Projects">
          <Button
            variant="ghost"
            onClick={shuffleCurrentProjectList}
            size="icon"
            asChild
            className={cn(isShufflingEnabled ? "text-[#1ed760]" : "text-zinc-400 hover:text-white")}>
            {/* <div className="h-6 w-6 sm:h-5 sm:w-5"> */}

            <span className="h-6 w-6 sm:h-5 sm:w-5 flex items-center justify-center">
              <Shuffle className="h-full w-full" />
              {isShufflingEnabled && <div className="w-1 h-1 rounded-full bg-[#1ed760] absolute translate-y-4">&nbsp;</div>}
            </span>
            {/* </div> */}
          </Button>
        </ToolTip>

        <ToolTip tooltipContent="Previous">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-zinc-400 hover:text-white"
            onClick={() => navigateCurrentProjectList('previous')}
          >
            <SkipBack className="h-6 w-6 sm:h-5 sm:w-5" />
          </Button>
        </ToolTip>

        <ToolTip tooltipContent="Play">
          <Button
            asChild
            onClick={() => redirectToProject()}
            size="icon"
            className="bg-white text-black hover:bg-white/90 rounded-full">
            <Play fill="black" className="h-10 w-10 p-1.5 sm:h-8 sm:w-8 sm:p-1" />
          </Button>
        </ToolTip>

        <ToolTip tooltipContent="Play">
          <Button
            asChild
            onClick={() => navigateCurrentProjectList('next')}
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white ">
            <SkipForward className="h-8 w-8 sm:h-5 sm:w-5" />
          </Button>
        </ToolTip>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white">
          <Repeat className="w-6 h-6 sm:h-5 sm:w-5" />
        </Button>
      </div>
      <div className="w-full items-center space-x-2 mt-2 hidden sm:flex">
        <span className="text-xs text-zinc-400">1:23</span>
        <div className="h-1 flex-1 bg-zinc-600 rounded-full">
          <div className="h-1 w-1/3 bg-white rounded-full"></div>
        </div>
        <span className="text-xs text-zinc-400">3:45</span>
      </div>
    </div>
  )
}
export { ProjectControls }