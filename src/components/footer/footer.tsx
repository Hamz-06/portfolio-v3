import React from 'react'
import { DisplayCurrentProject } from './displayCurrentProject'
import { ProjectControls } from './projectControls'
import clsx from 'clsx'
import { VolumeControls } from './volumeControls'
import { getCookie } from '@/actions/cookies/cookieHelper'
import { FooterProvider } from '@/redux/provider/footerProvider'
import { ProjectsModel } from '@/models/projectsModel'
import { CurrentProjectCookieKey, UserDeviceCookie, UserDeviceValue } from '@/types/cookieTypes'
import { CategorisedProject, CategorisedProjects } from '@/sanity/schema/schema-types'
import { MobileFooter } from './mobileFooter'
import { isSmallScreen } from '@/lib/utils'

type FooterProps = {
  className: string;
}

// todo: somehow display the playlist section in the footer for mobile and tablet 
async function Footer({ className }: FooterProps) {
  const [currentProjectKey, shuffleActiveRaw, projectSummary, deviceType] = await Promise.all([
    getCookie<CurrentProjectCookieKey>('current-project'),
    getCookie<boolean>('is-shuffling-enabled'),
    ProjectsModel.getInstance().getProjectSummary(),
    getCookie<UserDeviceCookie>('user-device')
  ]);
  //TODO: Create a new cookie function that handles this extra logix 
  const device: UserDeviceValue = deviceType ? deviceType['device-type'] : 'desktop';


  const shuffleActive = shuffleActiveRaw || false;
  const [projectsArray, currentProject] = await getCurrentProject(projectSummary, currentProjectKey);

  return (
    <FooterProvider projectsArray={projectsArray} currentProject={currentProject} shuffleEnabled={shuffleActive}>
      <div className={clsx(className, 'relative')}>

        {/* displays the current project playing  */}
        {isSmallScreen(device) ? (
          <MobileFooter />
        ) :
          (
            <>
              < DisplayCurrentProject />

              {/* controls for the current project */}
              <ProjectControls />

              {/* volume control and other buttons */}
              <VolumeControls />
            </>
          )}


      </div>
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
