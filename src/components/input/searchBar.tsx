'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { SearchModal } from '../modal/searchModal';
import { Command, Search, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { CategorisedProject } from '@/sanity/schema/schema-types';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTRPC } from '@/backend/trpc/provider';
import { useQuery } from '@tanstack/react-query';

const SEARCHABLE_KEYS: (keyof CategorisedProject)[] = ['title', 'sub_title'];

function SearchBar() {
  const trpc = useTRPC();
  const { data: projectLists } = useQuery(
    trpc.portfolio.getAllProjectsFlatList.queryOptions()
  );

  const [querySearchValue, setQuerySearchValue] = useState<CategorisedProject[]>([]);
  const [queryValue, setQueryValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  useHotkeys('ctrl+k, meta+k', () => {
    inputRef.current?.focus();
    if (queryValue.length > 0) {
      setIsModalOpen(true);
    }
  });

  const performSearch = (query: string) => {
    setQueryValue(query);

    if (query.length === 0) {
      setIsModalOpen(false);
      setQuerySearchValue([]);
      return;
    }

    if (!projectLists) {
      return;
    }

    const results = projectLists.filter((project) =>
      SEARCHABLE_KEYS.some((key) => {
        const projectValue = project[key];
        return (
          typeof projectValue === 'string' &&
          projectValue.toLowerCase().includes(query.toLowerCase())
        );
      })
    );

    setQuerySearchValue(results);
    setIsModalOpen(results.length > 0);
  };

  const clearSearch = () => {
    setQueryValue('');
    setQuerySearchValue([]);
    setIsModalOpen(false);
  };

  // Clear search when switching pages
  useEffect(() => {
    setQueryValue('');
  }, [pathname]);

  return (
    <>
      {/* Mobile Search */}
      <div className="flex justify-end items-center sm:hidden">
        <Button
          onClick={() => alert('Search not implemented on mobile')}
          asChild
          className="p-0 rounded-full"
        >
          <Search className="w-5 h-5 text-zinc-400 hover:text-white" />
        </Button>
      </div>

      {/* Desktop Search */}
      <div className="hidden sm:flex items-center justify-center relative w-full max-w-md h-12 group">
        <Input
          ref={inputRef}
          type="text"
          value={queryValue}
          onChange={(e) => performSearch(e.target.value)}
          className="block w-full rounded-full bg-zinc-800 py-3 pl-12 pr-4 text-sm text-white focus:ring-white focus:bg-zinc-700 hover:bg-zinc-700 transition-colors h-full border-0 focus-visible:ring-offset-0 focus-visible:ring-2"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none peer-focus:*:stroke-white">
          <Search className="w-6 h-6 stroke-zinc-400 group-hover:stroke-white" />
        </div>

        {/* Clear Button */}
        {queryValue.length > 0 && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer hover:stroke-white"
            aria-label="Clear search"
          >
            <XIcon className="w-6 h-6 stroke-zinc-400" />
          </button>
        )}

        {/* Placeholder with Keyboard Hint */}
        {queryValue.length === 0 && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 flex items-center text-zinc-400 font-light pointer-events-none space-x-2">
            <span>What do you want to play?</span>
            <div className="flex items-center space-x-1 ml-2">
              <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 inline-flex items-center justify-center w-7 h-7">
                <Command className="w-4 h-4" />
              </kbd>
              <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 inline-flex items-center justify-center w-7 h-7 text-sm">
                K
              </kbd>
            </div>
          </div>
        )}

        <SearchModal
          isOpen={isModalOpen}
          onModal={() => setIsModalOpen(false)}
          searchList={querySearchValue}
          querySearch={queryValue}
        />
      </div>
    </>
  );
}

export { SearchBar };


