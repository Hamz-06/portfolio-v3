'use client'

import { useDispatch } from 'react-redux'
import { setShuffle, useIsShufflingEnabled } from '@/redux/slice/projectDataSlice'
import { Shuffle } from 'lucide-react'
import ToolTip from '../tooltip/tooltip'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function ShuffleButton({ className }: Props) {
  const dispatch = useDispatch()
  const isShufflingEnabled = useIsShufflingEnabled()

  const shuffleCurrentProjectList = () => {
    dispatch(setShuffle(!isShufflingEnabled))
  }

  return (
    <ToolTip tooltipContent="Shuffle Projects">
      <div className='flex items-center justify-center'>
        <Button
          asChild
          variant="ghost"
          size="icon"
          onClick={shuffleCurrentProjectList}
          className={cn(
            isShufflingEnabled
              ? 'text-[#1ed760]'
              : 'text-zinc-400 hover:text-white'
          )}
        >
          <Shuffle className={className} />
        </Button>

        {isShufflingEnabled && (
          <div className="w-1 h-1 rounded-full bg-[#1ed760] absolute translate-y-5 sm:translate-y-3.5" />
        )}
      </div>

    </ToolTip>
  )
}
