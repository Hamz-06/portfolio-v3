'use client'

import { PlaylistCard } from '@/components/cards/playlist/playlistCard'
import { useQueryPlaylistsResults } from '@/redux/slice/playlists'
import { Playlists } from '@/schema/schema-types'
import React, { useEffect, useState } from 'react'
import clientSideCookie from 'js-cookie'
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


const LikedItemsPlaylist = () => {
  const [likedPlaylistItem, setLikedPlaylistItem] = useState<Playlists[number] | null>(null)

  useEffect(() => {
    const likes = JSON.parse(clientSideCookie.get('likes') || '[]')
    const numOfLikedProjects = likes.length
    if (numOfLikedProjects === 0) return

    setLikedPlaylistItem({
      description: `${numOfLikedProjects} liked projects`,
      playlist_name: 'Liked Projects',
      slug: 'liked-projects',
      type: 'liked',
      pinned: true,
      playlist_length: numOfLikedProjects,
      playlist_cover_image: '/playlist-heart.png',
    })
  }, [])

  if (!likedPlaylistItem) return null // todo: Load a skeleton

  return (
    <PlaylistCard key="liked" playlist={likedPlaylistItem} />
  )
}
export { PlaylistList }