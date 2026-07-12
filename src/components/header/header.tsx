import React from 'react'
import { SearchBar } from '../input/searchBar'
import clsx from 'clsx';
import { HomeButton } from '../button/homeButton';
import { LogoIcon } from '../layout/customIcons';
import { ProfileButton } from '../layout/profileButton';
import ToolTip from '../tooltip/tooltip';
import Link from 'next/link';
import { HOME_PAGE_ROUTE } from '@/constants/pageRoutes';

type HeaderProps = {
  className: string;
}

async function Header({ className }: HeaderProps) {

  return (
    <header className={clsx(className, 'w-full flex items-center justify-between')}>
      {/* Left section */}
      <div className="flex items-center space-x-4">

        {/* Spotify Logo hidden on mobile */}
        <div className='hidden sm:block'>
          <ToolTip tooltipContent='Home'>
            <Link href={HOME_PAGE_ROUTE}>
              <div
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:cursor-pointer">
                <LogoIcon />
              </div>
            </Link>
          </ToolTip>
        </div>
      </div>


      {/* Parent flex container */}
      <div className="flex items-center justify-between sm:justify-center w-full px-4">
        <HomeButton />
        <SearchBar />
      </div>


      {/* Right section */}
      <div className="flex items-center justify-end space-x-4">
        <div className='p-1.5 rounded-full hover:bg-gray-400/40'>
          <ProfileButton />
        </div>
      </div>
      {/* </div> */}
    </ header>
  )
}


export { Header }