'use client'
import ToolTip from '@/components/tooltip/tooltip'
import { setToggleSidebar, useToggleSidebar } from '@/redux/slice/layoutSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

function ToggleSideBar() {
  const toggleSideBar = useToggleSidebar()
  const dispatch = useDispatch()

  const displaySideBarOnclick = () => {
    dispatch(setToggleSidebar(true))
  }

  return !toggleSideBar && (
    <ToolTip tooltipContent='Display Library'>
      <div
        onClick={displaySideBarOnclick}
        className="w-2 h-1/2 absolute top-0 left-0 cursor-pointer">
      </div>
    </ToolTip>
  )
}

export { ToggleSideBar }