import React, { Suspense } from 'react'
import clsx from 'clsx';
import { HomeButton } from '../button/homeButton';
import { NotificationIcon, SpotifyIcon } from '../layout/customIcons';
import { ProfileButtonProvider } from '../layout/profileButtonProvider';
import { SearchBarProvider } from '../layout/searchBarProvider';
import { Skeleton } from '../ui/skeleton';

type HeaderProps = {
  className: string;
}

function Header({ className }: HeaderProps) {

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
        <Suspense fallback={<Skeleton className='hidden sm:flex items-center justify-center relative w-full rounded-full max-w-md h-12 bg-zinc-900' />}>
          <SearchBarProvider />
        </Suspense>
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
          {/* //TODO: ADD A SUSPENSE HERRRRRRRRE  */}
          <Suspense fallback={<Skeleton className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-black font-bold" />}>
            <ProfileButtonProvider />
          </Suspense>
        </div>
      </div>
      {/* </div> */}
    </div >
  )
}

export { Header }