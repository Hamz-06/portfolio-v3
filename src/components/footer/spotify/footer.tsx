import React from 'react'
import { DisplayCurrentProject } from './displayCurrentProject'
import { ProjectControls } from './currentProjectControls'
import clsx from 'clsx'
import { VolumeControls } from './volumeControls'

type FooterProps = {
  className: string;
}

async function Footer({ className }: FooterProps) {

  return (
    <div className={clsx(className, 'relative')}>

      {/* displays the current project playing  */}
      <DisplayCurrentProject />

      {/* controls for the current project */}
      <ProjectControls />

      {/* volume control and other buttons */}
      <VolumeControls />

    </div>
  )
}

export default Footer