import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Home, Library, Plus, Search } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

function Sidebar() {
  return (
    <>
      <div className="flex items-center px-3 py-2">
        Your Library
      </div>
      <div className="space-y-1">

        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Library className="mr-2 h-4 w-4" />
          Your Library
        </Button>
      </div>
      <Separator className="my-2 bg-zinc-800" />
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <ArrowRight className="mr-2 h-4 w-4" />
          Your Episodes
        </Button>
      </div>
      <Separator className="my-2 bg-zinc-800" />
      <ScrollArea className="flex-1">

        <div className="space-y-1 p-2">
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Liked Songs
          </Link>
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Your Top Songs 2023
          </Link>
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Discover Weekly
          </Link>
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Release Radar
          </Link>
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Chill Vibes
          </Link>
          <Link href="#" className="block py-2 text-sm text-zinc-400 hover:text-white">
            Workout Mix
          </Link>
        </div>
      </ScrollArea>
    </>
  )
}

export default Sidebar