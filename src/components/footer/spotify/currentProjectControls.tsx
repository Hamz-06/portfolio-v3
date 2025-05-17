'use client'

import { Button } from "@/components/ui/button";
import { navigateCurrentProject, shuffleCurrentProject, useCurrentProject } from "@/redux/slice/projectListSlice";
import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export type NavigationStep = 'previous' | 'next';

function ProjectControls() {
  const dispatch = useDispatch()
  const currentProject = useCurrentProject()
  const router = useRouter()

  const navigateCurrentProjectList = (step: NavigationStep) => {
    dispatch(navigateCurrentProject(step))
  }

  const shuffleCurrentProjectList = () => {
    dispatch(shuffleCurrentProject())
  }

  const displayInterceptProject = () => {
    if (!currentProject) return
    router.push(`portfolio/${currentProject.project_type}/${currentProject.slug}`)
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={shuffleCurrentProjectList}
          size="icon"
          className="text-zinc-400 hover:text-white">
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={() => navigateCurrentProjectList('previous')}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          onClick={displayInterceptProject}
          size="icon"
          className="bg-white text-black hover:bg-white/90 rounded-full">
          <Play className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigateCurrentProjectList('next')}
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white">
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Repeat className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-full flex items-center space-x-2 mt-2">
        <span className="text-xs text-zinc-400">1:23</span>
        <div className="h-1 flex-1 bg-zinc-600 rounded-full">
          <div className="h-1 w-1/3 bg-white rounded-full"></div>
        </div>
        <span className="text-xs text-zinc-400">3:45</span>
      </div>
    </>
  )
}
export { ProjectControls }