'use client'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

// Currently, not used
function SpotifyWrappedCard() {
  return (
    <div className='mx-0 sm:mx-10 h-32 sm:h-56 relative'>
      <Image
        alt='Spotify Wrapped'
        fill
        src='/spotify-wrapped.png'>
      </Image>

      <div className='absolute text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <a className=' inline-block font-bold text-3xl'>Your 2025 Wrapped</a>
        <a className='inline-block font-light text-xs mt-3'>Check what ive been working on last year</a><br />

        <Button asChild className='bg-black text-white font-light text-xs mt-1 rounded-4xl'>
          <div>
            <a>Check It Out</a>
            <ExternalLink />
          </div>
        </Button>
      </div>

    </div>
  )
}

export { SpotifyWrappedCard }