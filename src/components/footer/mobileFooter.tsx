'use client'

import React from 'react'
import { ListMusic } from 'lucide-react'
import { NotificationIcon } from '../layout/customIcons'
import { Button } from '../ui/button'
import { setMobileToggleSidebar, useMobileToggleSidebar } from '@/redux/slice/layoutSlice'
import { useDispatch } from 'react-redux'
import { ProjectNavigationButton } from '../button/projectNavigationButton'
import { cn } from '@/lib/utils'
const BUTTON_CLASS = 'flex flex-col items-center justify-center text-xs text-zinc-400 hover:text-white w-full h-full'

function MobileFooter() {
  const sidebar = useMobileToggleSidebar()
  const dispatch = useDispatch()

  const playlistsClickHandler = () => {
    dispatch(setMobileToggleSidebar(!sidebar))
  }

  return (
    <div className="grid grid-cols-4 w-full">

      <div className={cn(BUTTON_CLASS, 'justify-evenly')}>
        <ProjectNavigationButton className='w-5 h-5' direction='previous' />
        <span>previous</span>
      </div>
      {/* Playlists Button */}
      <Button
        onClick={playlistsClickHandler}
        asChild>
        <div className={BUTTON_CLASS}>
          <ListMusic
            style={{ width: '22px', height: '22px' }}
          />
          <span>Playlists</span>
        </div>
      </Button>

      {/* Notifications */}
      <Button
        onClick={() => alert('Set up notifications: not implemented yet')}
        asChild>
        <div className={BUTTON_CLASS}>
          <NotificationIcon
            style={{ width: '22px', height: '22px' }}
          />
          <span>Notifications</span>
        </div>
      </Button>

      <div className={cn(BUTTON_CLASS, 'justify-evenly')}>
        <ProjectNavigationButton className='w-5 h-5' direction='next' />
        <span>next</span>
      </div>
    </div>
  )
}

export { MobileFooter }
