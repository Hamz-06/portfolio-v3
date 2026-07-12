'use client'
import { setToggleSidebar, useToggleSidebar } from '@/zustand/toggleSidebar'
import { usePathname } from 'next/navigation'
import React from 'react'

type SidebarHandleProps = {
  isMobile: boolean
}

//TODO: Add type safety for the regex
const PORTFOLIO_DETAIL_REGEX = /^\/portfolio\/(projects|work_experience|blogs|education)\/[^/]+$/;

function SidebarHandle({ isMobile }: SidebarHandleProps) {
  const toggleSidebar = useToggleSidebar()
  const pathname = usePathname()

  if (isMobile) return <></>

  // TODO: dont hardcode this path, use a constant or config
  const isProjectPage = PORTFOLIO_DETAIL_REGEX.test(pathname)
  if (isProjectPage) {
    console.warn('Sidebar handle should not be displayed on project pages')
    return null
  }

  const displaySideBarOnclick = () => {
    console.log('Display Sidebar')
    setToggleSidebar(true)
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