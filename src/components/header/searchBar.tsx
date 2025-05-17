'use client'
import React from 'react'
import { Input } from '../ui/input'
import { useAllProjectsArray } from '@/redux/slice/projectListSlice'
import { SanityProject } from '@/types/projects/projects'
import { SearchDropdown } from '../modal/searchModal'

function SearchBar() {
  const allProjects = useAllProjectsArray()
  const [querySearchValue, setQuerySearchValue] = React.useState<SanityProject[]>([])
  const [queryValue, setQuerySearch] = React.useState<string>('')
  const [isModal, setModal] = React.useState(false)

  const keys: (keyof SanityProject)[] = ['title', 'sub_title']

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuerySearch(query) // swap
    // Handle the search query here
    if (query.length === 0) {
      setModal(false)
      setQuerySearchValue([])
      return
    }
    const value = allProjects.filter(project =>
      keys.some(key => project[key].toLowerCase().includes(query.toLowerCase()))
    )
    if (value.length > 0) {
      setModal(true)
    } else {
      console.log('No results found')
      setModal(false)
    }
    setQuerySearchValue(value)
  }


  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <Input
        type="search"
        onChange={handleSearch}
        className="block w-full rounded-full bg-zinc-800 py-2 pl-10 pr-3 text-sm
         text-zinc-200 placeholder:text-zinc-400 focus-visible:ring-1"
        placeholder="What do you want to see?"
      />
      <SearchDropdown
        isOpen={isModal}
        onModal={() => { setModal(false) }}
        searchList={querySearchValue}
        querySearch={queryValue}
      />
    </div>
  )
}

export { SearchBar }


