'use client'
import React from 'react'
import ExampleClient from '../example'

function ProjectCard() {
  return (
    <div className='bg-lime-300 w-full h-full rounded-2xl z-999'>

      <ExampleClient />
      {/* {projectType} - {slug} */}
    </div>
  )
}

export { ProjectCard }