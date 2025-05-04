'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Shuffle, SkipBack, Play, SkipForward, Repeat, ListMusic, Laptop, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { navigateCurrentProject, shuffleCurrentProject, useCurrentProject } from '@/redux/slice/projectListSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'


function Footer() {

  return (
    <>
      <div className="flex items-center w-1/3">
        <DisplayCurrentProject />
      </div>
      <div className="flex flex-col items-center w-1/3">
        <ProjectControls />

      </div>
      <div className="flex items-center justify-end w-1/3 space-x-3">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <ListMusic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Laptop className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <Volume2 className="h-4 w-4 text-zinc-400 mr-2" />
          <div className="h-1 w-24 bg-zinc-600 rounded-full">
            <div className="h-1 w-2/3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  )
}

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

// move to a separate file under the footer /spotify-footer
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

export default Footer