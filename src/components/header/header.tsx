'use client'
import React from 'react'
import { SearchBar } from './searchBar'
import clsx from 'clsx';

type HeaderProps = {
  className: string;
}
function Header({ className }: HeaderProps) {

  return (
    <div className={clsx(className, 'w-full flex items-center justify-between')}>
      {/* <div className="w-full flex items-center justify-between"> */}
      {/* <div className="w-full grid grid-cols-3 items-center"> */}
      {/* Left section */}
      <div className="flex items-center space-x-4">

        <a className='sm:hidden'>Good Morning</a>

        {/* Navigation arrows */}
        <div className="items-center space-x-2 hidden sm:flex">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-zinc-400 hover:text-white">
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
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-zinc-400 hover:text-white">
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
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Home button - visible only on mobile
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white md:hidden">
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
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button> */}
      </div>


      {/* Center section */}
      <div className="flex-1 mx-4 flex h-full items-center justify-end sm:justify-center">
        {/* Show full search bar on small+ screens */}
        <SearchBar />
      </div>


      {/* Right section */}
      <div className="flex items-center justify-end space-x-4">
        {/* <button className="hidden md:block px-4 py-1 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90">
            Explore Premium
          </button> */}
        <button className="text-zinc-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-black font-bold">
          H
        </button>
      </div>
      {/* </div> */}
    </div >
  )
}

export default Header