
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type ToolTipProps = {
  tooltipContent: string
  children: React.ReactNode;
}
function ToolTip({ tooltipContent, children }: ToolTipProps) {
  return (
    <TooltipProvider>

      <Tooltip delayDuration={800}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={5}
          side='top'
          className='bg-zinc-400 text-white p-1 rounded-md shadow-lg'
        >
          <>{tooltipContent}</>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip