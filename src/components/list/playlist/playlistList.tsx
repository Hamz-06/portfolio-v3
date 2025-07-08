'use client'

import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { useQueryPlaylistsResults } from '@/redux/slice/playlists'
import { Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// todo add palylist cover image
// add description 
// add type 
function PlaylistList() {
  const playlists = useQueryPlaylistsResults()
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {playlists?.map((item, index) => {
        const pinnedItems = index === 0
        return (
          <Link
            key={index}
            href={`/`}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden">
              <Image
                src={"/bart-simpson-cartoon.png"}
                alt={item.playlist_name}
                fill
                className={cn(
                  "object-cover",
                )}
              />
            </div>

            <div className="min-w-0 flex-1 font-light">
              <h3 className={cn(`truncate`, pinnedItems ? 'text-[#1ed760]' : 'text-white')}>{item.playlist_name}</h3>
              <p className="flex items-center gap-x-1 text-sm text-zinc-400 truncate">
                {pinnedItems && <Pin className="shrink-0 w-3 h-3 text-[#1ed760] fill-[#1ed760] rotate-45" />}
                <span className="truncate">
                  {item.type && capitalizeFirstLetter(item.type)}
                  {item.description && ` • ${item.description}`}
                </span>
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export { PlaylistList }