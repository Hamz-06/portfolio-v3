import { Button } from '@/components/ui/button'
import { Laptop, ListMusic, Volume2 } from 'lucide-react'
import React from 'react'

function VolumeControls() {
  return (
    <div className="items-center justify-end w-1/3 space-x-3 hidden sm:flex">

      <ListMusic className="h-4 w-4 text-zinc-400" />
      <Laptop className="h-4 w-4 text-zinc-400" />

      <div className="flex items-center">
        <Volume2 className="h-4 w-4 text-zinc-400 mr-2" />
        <div className="h-1 w-24 bg-zinc-600 rounded-full">
          <div className="h-1 w-2/3 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


export { VolumeControls }