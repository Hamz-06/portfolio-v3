import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { isProjectLiked } from '@/lib/utils';
import { getProject } from '@/models/projectsModel';
import { Metadata } from 'next';
import { Slider } from '@/components/layout/project/projectSlider';
import CentreImage from '@/components/layout/project/centreImage';
import { ProjectControls } from '@/components/layout/project/projectControls';
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal';
import { ProjectSummary } from '@/components/layout/project/projectSummary';
import TitleSlider from '@/components/layout/project/titleSlider';

type ProjectPageProps = {
  params: Promise<{ slug: string; project_type: string }>;
};

export async function generateMetadata(
  { params }: ProjectPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: project.tools_used,
    openGraph: {
      title: `Project type ${project.project_type}`,
      description: project.description || 'No description available for this project.',
      images: [
        {
          url: project.project_images[0] || '',
        }
      ],
    },
  };

}
//todo: move this to a constants file
const HOME_ROUTE: Routes = '/portfolio';

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project, likedProjects = []] = await Promise.all([
    getProject(slug),
    getCookie<string[]>('likes')
  ]);

  if (!project) {
    redirect(HOME_ROUTE);
  }

  const isLiked = await isProjectLiked(project.slug, likedProjects);

  return (
    <ProjectProvider project={project} isProjectLiked={isLiked}>
      {/* div used as the background, used here to allow the two div elements to slide */}
      <></>
      <Slider title='top'>
        <ProjectControls className="absolute top-0 right-0 m-5 flex pointer-events-auto" />
      </Slider>

      <CentreImage />


      <Slider title='bottom'>
        <TitleSlider />
      </Slider>


      <ProjectDetailsModal>
        <ProjectSummary />
      </ProjectDetailsModal>

    </ProjectProvider >
  );
}
