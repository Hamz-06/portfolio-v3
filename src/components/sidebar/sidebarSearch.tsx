'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { setQueryResults, usePlaylists, useQueryPlaylistsResults } from '@/redux/slice/playlistSlice'
import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { useDispatch } from 'react-redux'


const SEARCHABLE_KEYS: (keyof PlaylistsSummary[0])[] = ['playlist_name']

function SidebarSearch() {
  const dispatch = useDispatch()
  const queryPlaylists = useQueryPlaylistsResults()
  const playlists = usePlaylists()
  const [searchClick, setSearchClick] = useState(false)
  const [query, setQuery] = useState("")

  const inputRef = useRef<HTMLInputElement | null>(null)

  const onSearchClick = () => {
    setSearchClick(prev => !prev)
  }

  // TODO: this function is almost identical to the one in header/searchBar.tsx
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query) // swap
    // Handle the search query here
    if (query.length === 0) {
      dispatch(setQueryResults(playlists || []))
      return
    }

    const queriedPlaylists = (queryPlaylists || []).filter(playlist =>
      SEARCHABLE_KEYS.some(key => {
        const value = playlist[key];
        return typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase());
      })
    )

    dispatch(setQueryResults(queriedPlaylists))
  }

  // has to be done as the state needs to be set before the focus
  useEffect(() => {
    if (searchClick) {
      inputRef.current?.focus()
    }
  }, [searchClick])

  const onSearchBlur = () => {
    if (query.length === 0) {
      setSearchClick(false)
    }
  }

  return (
    <div className="relative w-[90%] h-[35px] mx-auto mt-2 mb-4">
      <Input
        ref={inputRef}
        onChange={handleSearch}
        value={query}
        type="text"
        placeholder="Search in Your Library"
        className="w-full h-full pl-10 pr-4 rounded-md bg-zinc-800 text-sm text-white placeholder:text-zinc-400 outline-none
         border-none focus-visible:ring-offset-0 focus-visible:ring-0"
        onBlur={onSearchBlur}
      />
      <Button
        onClick={onSearchClick}
        variant="ghost"
        asChild
        className="absolute left-1 top-1/2 -translate-y-1/2  rounded-full p-2 hover:bg-zinc-800"
      >
        <Search className="text-zinc-400 w-9 h-9" />
      </Button>
    </div>
  )
}

export { SidebarSearch }
