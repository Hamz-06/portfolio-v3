'use client'
import { setToggleSidebar, useToggleSidebar } from '@/redux/slice/layoutSlice'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

type SidebarHandleProps = {
  isMobile: boolean
}
function SidebarHandle({ isMobile }: SidebarHandleProps) {
  const dispatch = useDispatch()
  const toggleSidebar = useToggleSidebar()
  const pathname = usePathname()

  if (isMobile) return <></>

  const isProjectPage = pathname.startsWith('/portfolio/projects/')
  if (isProjectPage) {
    console.warn('Sidebar handle should not be displayed on project pages')
    return null
  }

  const displaySideBarOnclick = () => {
    console.log('Display Sidebar')
    dispatch(setToggleSidebar(true))
  }
  if (toggleSidebar) {
    return null
  }
  return (
    <div
      onClick={displaySideBarOnclick}
      className="w-2 h-1/2 absolute top-0 left-0 cursor-pointer z-999">
    </div>
  )
}

export { SidebarHandle }