import { Play } from 'lucide-react'
import React from 'react'

type PlaylistHeaderProps = {
  title: string
}
function PlaylistHeader({ title }: PlaylistHeaderProps) {
  return (
    <div className="sticky top-0 z-10 h-16">
      <div className="flex gap-2 justify-start items-center px-2 sm:px-10 w-full h-full bg-green-600 z-20">
        <div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/50 via-black/60 to-black/45 absolute pointer-events-none" />
        {/* title */}
        <div className='font-light h-8 z-30 flex items-center gap-2'>
          <Play className='size-11 p-3 bg-[#1ed760] rounded-full stroke-black fill-black' />
          <h1 className="text-white text-lg font-semibold">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export { PlaylistHeader }