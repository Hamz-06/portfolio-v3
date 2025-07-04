
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type ToolTipProps = {
  tooltipContent: string
  tooltipSide?: ToolTipSide
  children: React.ReactNode;
}

type ToolTipSide = 'top' | 'bottom';

function ToolTip({ tooltipContent, tooltipSide, children }: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={800}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={5}
          side={tooltipSide || 'top'}
          className='bg-zinc-400 text-white p-1 rounded-md shadow-lg'
        >
          <>{tooltipContent}</>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip