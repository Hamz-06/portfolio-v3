'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useTRPC } from '@/backend/trpc/provider';
import { PROJECT_PAGE_ROUTE } from '@/constants/pageRoutes';
import { getCurrentProject } from '@/helper/navigateProjects';
import { PORTFOLIO_DETAIL_REGEX } from '@/redux/provider/rootProvider';
import { CurrentProjectCookieKey } from '@/types/cookieTypes';

const IMAGE_DIMENSIONS = 56;
const IMAGE_CLASS = 'mr-3 h-14 w-14 flex-none rounded object-cover hover:cursor-pointer';
const TITLE_CLASS = 'line-clamp-2 pr-10 text-sm font-medium text-green-500 hover:cursor-pointer hover:underline';
const TYPE_CLASS = 'text-xs text-zinc-400 hover:cursor-pointer hover:underline';

function DisplayCurrentProject({
  currentProjectKey,
}: {
  currentProjectKey: CurrentProjectCookieKey | null;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const pathname = usePathname();

  const { data: allProjects } = useQuery(
    trpc.portfolio.getAllProjectsList.queryOptions()
  );

  if (!allProjects) return null;

  const currentProject = getCurrentProject(allProjects, currentProjectKey);
  if (!currentProject) return null;

  const isProjectPage = PORTFOLIO_DETAIL_REGEX.test(pathname);

  const handleNavigateToProject = () => {
    if (isProjectPage) return;
    router.push(
      PROJECT_PAGE_ROUTE(currentProject.project_type, currentProject.slug)
    );
  };

  return (
    <div className="hidden w-1/3 items-center sm:flex">
      <Image
        onClick={handleNavigateToProject}
        src={currentProject.first_image_url ?? '/placeholder.svg'}
        alt={currentProject.title}
        width={IMAGE_DIMENSIONS}
        height={IMAGE_DIMENSIONS}
        className={IMAGE_CLASS}
      />

      <div>
        <div
          onClick={handleNavigateToProject}
          className={TITLE_CLASS}
        >
          {currentProject.title}
        </div>

        <div
          onClick={handleNavigateToProject}
          className={TYPE_CLASS}
        >
          {currentProject.project_type}
        </div>
      </div>
    </div>
  );
}
export { DisplayCurrentProject };