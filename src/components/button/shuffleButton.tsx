'use client'

import { Shuffle } from 'lucide-react'
import ToolTip from '../tooltip/tooltip'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useShuffleStore } from '@/zustand/shuffle'

type Props = {
  className?: string
}

export function ShuffleButton({ className }: Props) {
  const isShufflingEnabled = useShuffleStore((state) => state.isShuffled)
  const toggleShuffle = useShuffleStore((state) => state.toggleShuffle)

  const shuffleCurrentProjectList = () => {
    toggleShuffle()
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
