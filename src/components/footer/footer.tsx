import { DisplayCurrentProject } from './displayCurrentProject';
import { ProjectControls } from './projectControls';
import { cn } from '@/lib/utils';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { CurrentProjectCookieKey } from '@/types/cookieTypes';

type FooterProps = {
  className?: string;
};

async function Footer({ className }: FooterProps) {
  const [currentProjectKey] = await Promise.all([
    getCookie<CurrentProjectCookieKey>('current-project'),
  ]);

  return (
    <div className={cn('relative', className)}>
      <DisplayCurrentProject currentProjectKey={currentProjectKey} />
      <ProjectControls />
      <div className="hidden w-1/3 sm:block" />
    </div>
  );
}


export { Footer }