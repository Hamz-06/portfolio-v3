import { DisplayCurrentProject } from './displayCurrentProject';
import { ProjectControls } from './projectControls';
import { cn } from '@/lib/utils';
import { getCookie } from '@/actions/cookies/cookieHelper';
import { CurrentProjectCookieKey, UserDeviceCookie, UserDeviceValue } from '@/types/cookieTypes';
import { MobileFooter } from './mobileFooter';
import { isSmallScreen } from '@/lib/utils';

type FooterProps = {
  className?: string;
};

// TODO: Display playlist section in footer for mobile and tablet
async function Footer({ className }: FooterProps) {
  const [currentProjectKey, deviceType] = await Promise.all([
    getCookie<CurrentProjectCookieKey>('current-project'),
    getCookie<UserDeviceCookie>('user-device')
  ]);

  const device: UserDeviceValue = deviceType?.['device-type'] ?? 'desktop';
  const isMobileView = isSmallScreen(device);


  return (
    <div className={cn('relative', className)}>
      {isMobileView ? (
        <MobileFooter />
      ) : (
        <>
          <DisplayCurrentProject currentProjectKey={currentProjectKey} />
          <ProjectControls />
          <div className="hidden w-1/3 sm:block" />
        </>
      )}
    </div>
  );
}


export { Footer }