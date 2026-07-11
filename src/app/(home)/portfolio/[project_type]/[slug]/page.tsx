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
import { ProjectDetailSidePane } from '@/components/layout/project/projectDetailSidePane';
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
    <ProjectProvider project={project} isProjectLiked={isLiked}>
      <div className="flex flex-col lg:flex-row h-full w-full relative overflow-hidden bg-black gap-2">
        {/* Left Pane (Visuals & Slides) */}
        <div className="flex-1 relative h-full overflow-hidden bg-black rounded-2xl">
          <Slider title='top'>
            <ProjectControls className="absolute top-0 right-0 m-5 flex pointer-events-auto" />
          </Slider>

          <CentreImage />

          <Slider title='bottom'>
            <TitleSlider />
          </Slider>
        </div>

        {/* Right Pane (Persistent Details on desktop) */}
        <ProjectDetailSidePane />
      </div>

      {/* Modal Drawer Sheet fallback for mobile/tablet where the right panel is hidden */}
      <div className="lg:hidden">
        <ProjectDetailsModal>
          <ProjectSummary />
        </ProjectDetailsModal>
      </div>
    </ProjectProvider >
  );
}
