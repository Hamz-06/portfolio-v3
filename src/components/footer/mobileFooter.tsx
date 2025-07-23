'use client'

import React, { useEffect } from 'react'
import { ListMusic } from 'lucide-react'
import { NotificationIcon } from '../layout/customIcons'
import { Button } from '../ui/button'
import { setToggleSidebar, useToggleSidebar } from '@/redux/slice/layoutSlice'
import { useDispatch } from 'react-redux'

const BUTTON_CLASS = 'flex flex-col items-center justify-center text-xs text-zinc-400 hover:text-white w-full h-full'

function MobileFooter() {
  const sidebar = useToggleSidebar()
  const dispatch = useDispatch()

  const playlistsClickHandler = () => {
    dispatch(setToggleSidebar(!sidebar))
  }

  useEffect(() => {
    console.log('Sidebar state changed:', sidebar)
  }, [sidebar])

  return (
    <div className="grid grid-cols-2 w-full px-10">


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


    </div>
  )
}

export { MobileFooter }
