import React from 'react'
import { DisplayCurrentProject } from './displayCurrentProject'
import { ProjectControls } from './projectControls'
import clsx from 'clsx'
import { VolumeControls } from './volumeControls'
import { getCookie } from '@/actions/cookies/cookieHelper'
import { FooterProvider } from '@/redux/provider/footerProvider'
import { ProjectsModel } from '@/models/projectsModel'
import { CurrentProjectCookieKey } from '@/types/cookieTypes'
import { CategorisedProject, CategorisedProjects } from '@/sanity/schema/schema-types'

type FooterProps = {
  className: string;
}

// todo: somehow display the playlist section in the footer 
async function Footer({ className }: FooterProps) {
  const [currentProjectKey, shuffleActiveRaw, projectSummary] = await Promise.all([
    getCookie<CurrentProjectCookieKey>('current-project'),
    getCookie<boolean>('is-shuffling-enabled'),
    ProjectsModel.getInstance().getProjectSummary()
  ]);

  const shuffleActive = shuffleActiveRaw || false;
  const [projectsArray, currentProject] = await getCurrentProject(projectSummary, currentProjectKey);

  return (
    <FooterProvider projectsArray={projectsArray} currentProject={currentProject} shuffleEnabled={shuffleActive}>
      <div className={clsx(className, 'relative')}>

        {/* displays the current project playing  */}
        <DisplayCurrentProject />

        {/* controls for the current project */}
        <ProjectControls />

        {/* volume control and other buttons */}
        <VolumeControls />

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
