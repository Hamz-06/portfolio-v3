import React from 'react'
import { SearchBar } from '../input/searchBar'
import clsx from 'clsx';
import { HomeButton } from '../button/homeButton';
import { NotificationIcon, SpotifyIcon } from '../layout/customIcons';

import { ProfileButton } from '../layout/profileButton';
import { getProjectSummary } from '@/models/projectsModel';
import { CategorisedProject, CategorisedProjects } from '@/sanity/schema/schema-types';
import ToolTip from '../tooltip/tooltip';
import Link from 'next/link';
import { Routes } from '@/types/routes';

type HeaderProps = {
  className: string;
}

const HOME_PAGE: Routes = '/portfolio'
async function Header({ className }: HeaderProps) {
  const projectsSummary = await getProjectSummary()

  return (
    <div className={clsx(className, 'w-full flex items-center justify-between')}>
      {/* Left section */}
      <div className="flex items-center space-x-4">

        {/* Spotify Logo */}

        <ToolTip tooltipContent='Home'>
          <Link href={HOME_PAGE}>
            <div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:cursor-pointer">
              <SpotifyIcon />
            </div>
          </Link>
        </ToolTip>
      </div>


      {/* Parent flex container */}
      <div className="flex items-center justify-between sm:justify-center w-full px-4">
        <HomeButton />
        <SearchBar projectsSummary={makeProjectsArray(projectsSummary)} />
      </div>


      {/* Right section */}
      <div className="flex items-center justify-end space-x-4">

        {/* TODO move the notif to new file */}
        <div className="text-zinc-400 hover:text-white hidden sm:block">
          <NotificationIcon />
        </div>

        <div className='p-1.5 rounded-full hover:bg-gray-400/40'>
          <ProfileButton />
        </div>
      </div>
      {/* </div> */}
    </div >
  )
}

const makeProjectsArray = (projectsSummary: CategorisedProjects): CategorisedProject[] => {
  return Object.values(projectsSummary).flatMap((projects) => projects)
}


export { Header }