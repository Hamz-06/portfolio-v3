'use client'

import { PlaylistCard } from '@/components/cards/playlist/playlistCard'
import { useQueryPlaylistsResults } from '@/redux/slice/playlistSlice'
import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import React, { useEffect, useState } from 'react'
import { getClientCookie } from '@/actions/cookies/cookieHelperClient'
import { Skeleton } from '@/components/ui/skeleton'

function PlaylistList() {
  const playlists = useQueryPlaylistsResults()
  return (
    <div className="flex-1 overflow-y-auto px-2">
      <LikedItemsPlaylist />
      {playlists?.map((item, index) => {
        return (
          <PlaylistCard playlist={item} key={index} />
        )
      })}
    </div>
  )
}

// rendered on the client side
const LikedItemsPlaylist = () => {
  const [likedPlaylistItem, setLikedPlaylistItem] = useState<PlaylistsSummary[number] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const likedProjects = getClientCookie<string[] | null>('likes') || []
    setLoading(false)

    const likedProjectsLength = likedProjects.length
    if (likedProjectsLength === 0) return

    setLikedPlaylistItem({
      description: `${likedProjectsLength} liked projects`,
      playlist_name: 'Liked Projects',
      slug: 'liked-projects',
      type: 'liked',
      pinned: true,
      playlist_length: likedProjectsLength,
      playlist_cover_image: '/playlist-heart.png',
    })
  }, [])

  if (loading) return <Skeleton className='h-16 w-full bg-zinc-800'></Skeleton>
  if (!likedPlaylistItem) return null

  return (
    <PlaylistCard key="liked" playlist={likedPlaylistItem} />
  )
}
export { PlaylistList }