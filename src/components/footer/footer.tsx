import React from 'react'
import { DisplayCurrentProject } from './displayCurrentProject'
import { ProjectControls } from './projectControls'
import clsx from 'clsx'
import { VolumeControls } from './volumeControls'
import { getCookie } from '@/actions/cookies/cookieHelper'
import { FooterProvider } from '@/redux/provider/footerProvider'
import { getProjectSummary } from '@/models/projectsModel'
import { CurrentProjectCookieKey, UserDeviceCookie, UserDeviceValue } from '@/types/cookieTypes'
import { CategorisedProject, CategorisedProjects } from '@/sanity/schema/schema-types'
import { MobileFooter } from './mobileFooter'
import { isSmallScreen } from '@/lib/utils'
import { FooterClient } from './footerClient'

// todo: somehow display the playlist section in the footer for mobile and tablet 
async function Footer() {
  const [currentProjectKey, shuffleActiveRaw, projectSummary, deviceType] = await Promise.all([
    getCookie<CurrentProjectCookieKey>('current-project'),
    getCookie<boolean>('is-shuffling-enabled'),
    getProjectSummary(),
    getCookie<UserDeviceCookie>('user-device')
  ]);
  //TODO: Create a new cookie function that handles this extra logix 
  const device: UserDeviceValue = deviceType ? deviceType['device-type'] : 'desktop';


  const shuffleActive = shuffleActiveRaw || false;
  const [projectsArray, currentProject] = await getCurrentProject(projectSummary, currentProjectKey);

  return (
    <FooterProvider projectsArray={projectsArray} currentProject={currentProject} shuffleEnabled={shuffleActive}>
      <footer className='fixed bottom-0 h-[var(--desktop-footer-height)] z-36 mt-auto w-full bg-black p-2 px-4 flex items-center'>

        {/* displays the current project playing  */}
        {isSmallScreen(device) ? (
          <MobileFooter />
        ) :
          (
            <>
              <DisplayCurrentProject />

              {/* controls for the current project */}
              <ProjectControls />

              {/* volume control and other buttons */}
              <VolumeControls />
            </>
          )}


      </footer>
    </FooterProvider>
  )
}


const getCurrentProject = async (projectSummary: CategorisedProjects, currentProjectKey: CurrentProjectCookieKey | null)
  : Promise<[CategorisedProject[], CategorisedProject]> => {
  const projectsArray = Object.values(projectSummary).flatMap((projects) => projects)
  const currentProject = projectsArray.find((project) => project.slug === currentProjectKey?.project_slug) || projectsArray[0];
  return [projectsArray, currentProject]
}

export { Footer }
