'use client'

import React from 'react'

export default function AboutMe() {
  return (
    <div>
      <div className="flex flex-col h-full w-full overflow-auto">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-2xl font-bold">About Me</h1>
          <p className="text-lg">This is the about me page.</p>
        </div>
      </div>
    </div>
  )
}
