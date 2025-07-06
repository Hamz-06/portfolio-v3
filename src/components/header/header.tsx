import React from 'react'
import { SearchBar } from './searchBar'
import clsx from 'clsx';
import { HomeButton } from './homeButton';
import { NotificationIcon, SpotifyIcon } from '../icons/customIcons';
import { Button } from '../ui/button';
import { AccountMenuBar } from '../context-menu/accountMenu';

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
          <SpotifyIcon />
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
        <div className="text-zinc-400 hover:text-white">
          <NotificationIcon />
        </div>

        <div className='p-1.5 rounded-full hover:bg-gray-400/40'>
          <AccountMenuBar>
            <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-black font-bold">
              H
            </Button>
          </AccountMenuBar>
        </div>
      </div>
      {/* </div> */}
    </div >
  )
}


export { Header }