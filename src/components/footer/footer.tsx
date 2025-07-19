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
  const shuffleActive = await getCookie<boolean>('is-shuffling-enabled') || false;
  const projectSummary = await ProjectsModel.getInstance().getProjectSummary();
  const [projectsArray, currentProject] = await getCurrentProject(projectSummary);

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


const getCurrentProject = async (projectSummary: CategorisedProjects): Promise<[CategorisedProject[], CategorisedProject]> => {
  const currentProjectKey = await getCookie<CurrentProjectCookieKey>('current-project');
  const projectsArray = Object.values(projectSummary).flatMap((projects) => projects)

  const currentProject = projectsArray.find((project) => project.slug === currentProjectKey?.project_slug) || projectsArray[0];
  return [projectsArray, currentProject]
}


export { Footer }