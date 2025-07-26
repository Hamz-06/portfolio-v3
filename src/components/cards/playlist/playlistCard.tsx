'use client'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { setMobileToggleSidebar } from '@/redux/slice/layoutSlice'
import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

type PlaylistCardProps = {
  playlist: NonNullable<PlaylistsSummary[number]>,
}
function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { type, slug, playlist_name, pinned: isPinned, description } = playlist
  const dispatch = useDispatch()

  const onClickHandler = () => {
    dispatch(setMobileToggleSidebar(false))
  }

  return (
    <Link
      onClick={() => onClickHandler()}
      href={`/portfolio/playlist/${slug}`}
      className="flex items-center gap-3 p-2 rounded-md h-16 hover:bg-zinc-800"
    >
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden">
        <Image
          src={playlist.playlist_cover_image || '/mona-lisa.png'}
          alt={playlist_name}
          fill
          className="object-cover rounded-sm"
        />
      </div>

      <div className="min-w-0 flex-1 font-light">
        <h3 className={cn(`truncate`, isPinned ? 'text-[#1ed760]' : 'text-white')}>{playlist_name}</h3>
        <p className="flex items-center gap-x-1 text-sm text-zinc-400 truncate">
          {isPinned && <Pin className="shrink-0 w-3 h-3 text-[#1ed760] fill-[#1ed760] rotate-45" />}
          <span className="truncate">
            {type && capitalizeFirstLetter(type)}
            {description && ` • ${description}`}
          </span>
        </p>
      </div>
    </Link>
  )
}

export { PlaylistCard }