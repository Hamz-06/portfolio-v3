import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { isProjectLiked } from '@/lib/utils';
import { getProject } from '@/models/projectsModel';
import { Metadata } from 'next';
import { Slider } from '@/components/layout/project/projectSlider';
import { ProjectControls } from '@/components/layout/project/projectControls';
import CentreImage from '@/components/layout/project/centreImage';
import TitleSlider from '@/components/layout/project/titleSlider';
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal';
import { ProjectSummary } from '@/components/layout/project/projectSummary';
import { HydrateClient, trpc } from '@/backend/trpc/server';
import { ImageGrid } from '@/components/grid/project/imageGrid';


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
  const project = await getProject(slug);
  const likedProjects = await getCookie<string[]>('likes')

  if (!project) {
    redirect(HOME_ROUTE);
  }

  await trpc.portfolio.getProject.prefetch({ slug: project.slug });

  const isLiked = await isProjectLiked(project.slug, likedProjects);

  return (
    <HydrateClient>
      <ProjectProvider project={project} isProjectLiked={isLiked}>
        {/* div used as the background, used here to allow the two div elements to slide */}
        <></>
        <Slider title='top'>
          <ProjectControls slug={project.slug} className="absolute top-0 right-0 m-5 flex pointer-events-auto" />
        </Slider>

        {/* <CentreImage /> */}
        <ImageGrid slug={project.slug} />

        <Slider title='bottom'>
          <TitleSlider slug={project.slug} />
        </Slider>


        <ProjectDetailsModal>
          <ProjectSummary slug={project.slug} />
        </ProjectDetailsModal>

      </ProjectProvider >
    </HydrateClient>
  );
}
