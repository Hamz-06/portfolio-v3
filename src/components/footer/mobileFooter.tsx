'use client';

import { ListMusic } from 'lucide-react';
import { NotificationIcon } from '../layout/customIcons';
import { Button } from '../ui/button';
import { setMobileToggleSidebar, useMobileToggleSidebar } from '@/zustand/toggleSidebar';
import { ProjectNavigationButton } from '../button/projectNavigationButton';
import { cn } from '@/lib/utils';

const BUTTON_CLASS = 'flex flex-col items-center justify-center text-xs text-zinc-400 hover:text-white w-full h-full';
const ICON_DIMENSIONS = { width: '22px', height: '22px' };

function MobileFooter() {
  const sidebar = useMobileToggleSidebar();

  const handlePlaylistsClick = () => {
    setMobileToggleSidebar(!sidebar);
  };

  const handleNotificationsClick = () => {
    alert('Set up notifications: not implemented yet');
  };

  return (
    <div className="grid grid-cols-4 w-full">
      <div className={cn(BUTTON_CLASS, 'justify-evenly')}>
        <ProjectNavigationButton className="w-5 h-5" direction="previous" />
        <span>previous</span>
      </div>

      <Button onClick={handlePlaylistsClick} asChild>
        <div className={BUTTON_CLASS}>
          <ListMusic style={ICON_DIMENSIONS} />
          <span>Playlists</span>
        </div>
      </Button>

      <Button onClick={handleNotificationsClick} asChild>
        <div className={BUTTON_CLASS}>
          <NotificationIcon style={ICON_DIMENSIONS} />
          <span>Notifications</span>
        </div>
      </Button>

      <div className={cn(BUTTON_CLASS, 'justify-evenly')}>
        <ProjectNavigationButton className="w-5 h-5" direction="next" />
        <span>next</span>
      </div>
    </div>
  );
}

export { MobileFooter }
