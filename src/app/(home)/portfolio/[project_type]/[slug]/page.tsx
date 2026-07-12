import { redirect } from 'next/navigation';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { cn, isProjectLiked } from '@/lib/utils';
import { getProject } from '@/models/projectsModel';
import { Metadata } from 'next';
import { ProjectControls } from '@/components/layout/project/projectControls';
import TitleSlider from '@/components/layout/project/titleSlider';
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal';
import { ProjectDetailSidePane } from '@/components/layout/project/projectDetailSidePane';
import { ProjectSummary } from '@/components/layout/project/projectSummary';
import { trpc } from '@/backend/trpc/server';
import { ImageCarousel } from '@/components/carousel/project/imageCarousel';
import { HOME_PAGE_ROUTE } from '@/constants/pageRoutes';
import { ProjectProvider } from '@/zustand/provider/projectProvider';


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
      title: project.title,
      description: project.description || 'No description available for this project.',
      images: [
        {
          url: project.project_images[0] || '',
        }
      ],
    },
  };
}



export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  const likedProjects = await getCookie<string[]>('likes')

  if (!project) {
    redirect(HOME_PAGE_ROUTE);
  }

  const isLiked = await isProjectLiked(project.slug, likedProjects);
  await trpc.portfolio.getProject.prefetch({ slug: project.slug });

  return (
    <ProjectProvider project={project} isProjectLiked={isLiked}>
      <div className="flex flex-col lg:flex-row h-full w-full relative overflow-hidden bg-black">
        <div
          className={cn("flex-1 relative h-full overflow-hidden rounded-2xl")}
          style={{ backgroundColor: project.primary_color || '#000000' }}
        >
          <ProjectControls className="absolute top-0 right-0 m-5 flex pointer-events-auto" />

          <ImageCarousel />

          <TitleSlider />
        </div>
        <ProjectDetailSidePane />
      </div>

      <div className="lg:hidden">
        <ProjectDetailsModal>
          <ProjectSummary />
        </ProjectDetailsModal>
      </div>
    </ProjectProvider>
  );
}
