import { ProjectView } from '@/components/layout/project/projectView';
import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { isProjectLiked } from '@/lib/utils';
import { ProjectsModel } from '@/models/projectsModel';
import { Metadata } from 'next';

type ProjectPageProps = {
  params: Promise<{ slug: string; project_type: string }>;
};

export async function generateMetadata(
  { params }: ProjectPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const project = await ProjectsModel.getInstance().getProject(slug);
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
    ProjectsModel.getInstance().getProject(slug),
    getCookie<string[]>('likes')
  ]);

  if (!project) {
    redirect(HOME_ROUTE);
  }

  const isLiked = await isProjectLiked(project.slug, likedProjects);

  return (
    <ProjectProvider project={project} isProjectLiked={isLiked}>
      {/* div used as the background, used here to allow the two div elements to slide */}
      <div className="relative flex-1 bg-black overflow-y-scroll" />
      <ProjectView />
    </ProjectProvider>
  );
}
