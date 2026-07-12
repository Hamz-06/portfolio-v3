'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Play, Pause } from 'lucide-react'
import { usePlayToggle } from '@/zustand/togglePlay'
import { useRouter } from 'next/navigation'
import { useTRPC } from '@/backend/trpc/provider'
import { CurrentProjectCookieKey } from '@/types/cookieTypes'
import { getClientCookie } from '@/helper/cookieHelperClient'
import { navigateCurrentProject } from '@/helper/navigateProjects'
import { useQuery } from '@tanstack/react-query'
import { PROJECT_PAGE_ROUTE } from '@/constants/pageRoutes'


function PlayButton() {
  const isPlayButton = usePlayToggle();
  const trpc = useTRPC()
  const router = useRouter()

  const { data: allProjects } = useQuery(trpc.portfolio.getAllProjectsFlatList.queryOptions())

  const handleClick = () => {
    if (!allProjects) return;

    const currentProject = getClientCookie<CurrentProjectCookieKey>('current-project');
    const isShuffleEnabled =
      getClientCookie<boolean>('is-shuffling-enabled') ?? false;

    const nextProject = navigateCurrentProject(
      allProjects,
      currentProject,
      'play',
      isShuffleEnabled
    );

    if (!nextProject) return;

    router.push(
      PROJECT_PAGE_ROUTE(nextProject.projectType, nextProject.projectSlug)
    );
  };

  return (
    <Button
      asChild
      onClick={handleClick}
      size="icon"
      className="bg-white text-black hover:bg-white/90 rounded-full "
    >
      {isPlayButton ? (
        <Pause
          fill='black'
          className="h-10 w-10 p-1.5 sm:h-8 sm:w-8 sm:p-1"
        />
      ) : (
        <Play
          fill='black'
          className="h-10 w-10 p-1.5 sm:h-8 sm:w-8 sm:p-1"
        />
      )}
    </Button>
  )
}

export { PlayButton }