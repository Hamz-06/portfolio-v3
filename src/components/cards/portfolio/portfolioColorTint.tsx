'use client'

import { cn } from '@/lib/utils'
import { usePageColorTint } from '@/redux/slice/styleSlice'
import React from 'react'

function PortfolioColorTint() {
  const colorTint = usePageColorTint();

  const colorMap: Record<string, string> = {
    violet: "to-violet-800/50",
    blue: "to-blue-500/50",
    // add more as needed
  };

  const tintClass = colorTint ? colorMap[colorTint] : "to-violet-800/50";

  return (

    <div className={cn(
      "absolute top-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-transparent",
      tintClass
    )} />
  )
}

export default PortfolioColorTint