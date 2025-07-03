import React from 'react'
import { SearchBar } from './searchBar'
import clsx from 'clsx';
import { HomeButton } from './homeButton';

type HeaderProps = {
  className: string;
}


async function Header({ className }: HeaderProps) {
  return (
    <div className={clsx(className, 'w-full flex items-center justify-between')}>
      {/* Left section */}
      <div className="flex items-center space-x-4">

        {/* Spotify Logo */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" className="text-black">
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.062 14.583c-.168.275-.525.367-.8.2-2.19-1.338-4.947-1.641-8.2-.9-.35.08-.7-.13-.78-.48-.08-.35.13-.7.48-.78 3.566-.813 6.622-.456 9.1 1.04.275.168.367.525.2.8zm1.14-2.54c-.21.34-.66.45-1 .24-2.51-1.54-6.33-1.99-9.3-1.09-.42.13-.86-.09-.99-.51-.13-.42.09-.86.51-.99 3.39-1.03 7.68-.53 10.54 1.25.34.21.45.66.24 1zm.1-2.64C14.94 9.95 9.9 9.73 7.1 10.54c-.49.14-1.01-.14-1.15-.63-.14-.49.14-1.01.63-1.15 3.2-.93 8.74-.67 12.14 1.55.39.25.51.78.26 1.17-.25.39-.78.51-1.17.26z"
            />
          </svg>
        </div>
      </div>


      {/* Parent flex container */}
      <div className="flex items-center justify-between sm:justify-center w-full px-4">
        <HomeButton />

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


export { Header }