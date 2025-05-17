'use client'
import React from 'react'
import { Button } from '../../ui/button'
import { ListMusic, Laptop, Volume2 } from 'lucide-react'
import { DisplayCurrentProject } from './displayCurrentProject'
import { ProjectControls } from './currentProjectControls'


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






export default Footer