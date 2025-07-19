'use client'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { SearchModal } from '../modal/searchModal'
import { Command, Search, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { CategorisedProject } from '@/sanity/schema/schema-types'
import { useHotkeys } from 'react-hotkeys-hook';

const SEARCHABLE_KEYS: (keyof CategorisedProject)[] = ['title', 'sub_title']

type SearchBarProps = {
  projectsSummary: CategorisedProject[]
}

function SearchBar({ projectsSummary }: SearchBarProps) {

  const [querySearchValue, setQuerySearchValue] = React.useState<CategorisedProject[]>([])
  const [queryValue, setQuerySearch] = React.useState<string>('')
  const [isModal, setModal] = React.useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  useHotkeys('ctrl+k, meta+k', () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // if query is not empty, open the modal
      if (queryValue.length > 0) {
        setModal(true);
      }
    }
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuerySearch(query) // swap
    // Handle the search query here
    if (query.length === 0) {
      setModal(false)
      setQuerySearchValue([])
      return
    }
    if (!projectsSummary) {
      return
    }
    const value = projectsSummary.filter(project =>
      SEARCHABLE_KEYS.some(key => {
        const projectValue = project[key];
        return (
          typeof projectValue === 'string' && projectValue.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
    if (value.length > 0) {
      setModal(true)
    } else {
      console.log('No results found')
      setModal(false)
    }
    setQuerySearchValue(value)
  }

  // clear search when switching pages
  useEffect(() => {
    setQuerySearch('');
  }, [pathname])

  return (
    <>
      <div className="flex justify-end items-center sm:hidden">
        <Button
          onClick={() => alert('search not implemented on mobile')}
          asChild
          className="p-0 rounded-full">
          <Search className="w-5 h-5 text-zinc-400 hover:text-white" />
        </Button>
      </div>

      <div
        className="hidden sm:flex items-center justify-center relative w-full max-w-md h-12 group">

        <Input
          ref={inputRef}
          type="text"
          value={queryValue}
          onChange={handleSearch}
          className="block w-full rounded-full bg-zinc-800 py-3 pl-12 pr-4 text-sm text-white 
         focus:ring-white focus:bg-zinc-700 hover:bg-zinc-700 transition-colors h-full border-0 pee
        focus-visible:ring-offset-0 focus-visible:ring-2"
        />

        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none 
          peer-focus:*:stroke-white">
          <Search className="w-6 h-6 stroke-zinc-400 group-hover:stroke-white" />
        </div>

        <div
          onClick={() => setQuerySearch('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer hover:stroke-white"
          style={{ display: queryValue.length > 0 ? 'flex' : 'none' }}>
          <XIcon className="w-6 h-6 stroke-zinc-400" />
        </div>

        {/* Custom Placeholder */}
        {queryValue.length === 0 && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 flex items-center text-zinc-400 font-light pointer-events-none space-x-2">
            <span>What do you want to play?</span>

            <div className="flex items-center space-x-1 ml-2">
              <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 inline-flex items-center justify-center w-7 h-7">
                <Command className="w-4 h-4" />
              </kbd>
              <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 inline-flex items-center justify-center w-7 h-7">
                <a className="text-sm leading-none">K</a>
              </kbd>
            </div>
          </div>
        )}


        <SearchModal
          isOpen={isModal}
          onModal={() => setModal(false)}
          searchList={querySearchValue}
          querySearch={queryValue}
        />
      </div>
    </>
  )
}

export { SearchBar }


