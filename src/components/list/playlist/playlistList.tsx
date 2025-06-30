'use client'

import { PortfolioItem } from '@/components/sidebar/sidebar'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type PlaylistListProps = {
  playlistList: PortfolioItem[]
}
function PlaylistList({ playlistList }: PlaylistListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {playlistList.map((item) => {
        const pinnedItems = item.pinned
        return (
          <Link
            key={item.id}
            href={`/${item.type}/${item.id}`}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden">
              <Image
                src={item.imageUrl || "/bart-simpson-cartoon.png"}
                alt={item.title}
                fill
                className={cn(
                  "object-cover",
                  item.type === "artist" && "rounded-full",
                  item.type !== "artist" && "rounded",
                )}
              />
            </div>

            <div className="min-w-0 flex-1 font-light">
              <h3 className={cn(`truncate`, pinnedItems ? 'text-[#1ed760]' : 'text-white')}>{item.title}</h3>
              <p className="flex items-center gap-x-1 text-sm text-zinc-400 truncate">
                {pinnedItems && <Pin className="shrink-0 w-3 h-3 text-[#1ed760] fill-[#1ed760] rotate-45" />}
                <span className="truncate">
                  {capitalizeFirstLetter(item.type)}
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