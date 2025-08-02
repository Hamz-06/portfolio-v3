'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Play, Pause } from 'lucide-react'
import { setTogglePlay, useCurrentProject, usePlayToggle } from '@/redux/slice/projectDataSlice'
import { useDispatch } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'

//TODO: Add type safety for the regex
const PORTFOLIO_DETAIL_REGEX = /^\/portfolio\/(projects|work_experience|blogs|education)\/[^/]+$/;

function PlayButton() {
  const isPlayButton = usePlayToggle();
  const currentProject = useCurrentProject();
  const dispatch = useDispatch();
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const isDetailPage = PORTFOLIO_DETAIL_REGEX.test(pathname);
    console.log('Page changed to:', isDetailPage)
    dispatch(setTogglePlay(isDetailPage))
  }, [pathname, dispatch])

  const onClick = () => {
    if (PORTFOLIO_DETAIL_REGEX.test(pathname) || !currentProject) return;
    router.push(`/portfolio/${currentProject.project_type}/${currentProject.slug}`);
  }

  return (
    <Button
      asChild
      onClick={onClick}
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