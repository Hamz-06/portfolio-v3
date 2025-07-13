'use client'

import { PlaylistCard } from '@/components/cards/playlist/playlistCard'
import { useQueryPlaylistsResults } from '@/redux/slice/playlists'
import { Playlists } from '@/schema/schema-types'
import React, { useEffect, useState } from 'react'
import { getClientCookie } from '@/actions/cookies/cookieHelperClient'
// todo add playlist cover image
// add description 
// add type 

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
  const [likedPlaylistItem, setLikedPlaylistItem] = useState<Playlists[number] | null>(null)

  useEffect(() => {
    const likedProjects = getClientCookie<string[] | null>('likes') || []

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

  if (!likedPlaylistItem) return null // todo: Load a skeleton

  return (
    <PlaylistCard key="liked" playlist={likedPlaylistItem} />
  )
}
export { PlaylistList }