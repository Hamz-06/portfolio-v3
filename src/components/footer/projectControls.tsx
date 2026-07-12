import { Repeat } from 'lucide-react';
import { ProjectNavigationButton } from '../button/projectNavigationButton';
import { PlayButton } from '../button/playButton';
import { ShuffleButton } from '../button/shuffleButton';
import ToolTip from '@/components/tooltip/tooltip';

const ICON_CLASS_LARGE = 'h-6 w-6 sm:h-5 sm:w-5';
const ICON_CLASS_NAVIGATION = 'h-8 w-8 sm:h-5 sm:w-5';
const PROGRESS_TIME = { current: '1:23', total: '3:45' };

function ProjectControls() {
  return (
    <div className="flex flex-col items-center w-full sm:w-1/3">
      <div className="flex items-center space-x-7 sm:space-x-4">
        <ShuffleButton className={ICON_CLASS_LARGE} />
        <ProjectNavigationButton direction="previous" className={ICON_CLASS_NAVIGATION} />
        <PlayButton />
        <ProjectNavigationButton direction="next" className={ICON_CLASS_NAVIGATION} />
        <ToolTip tooltipContent="Repeat is disabled">
          <Repeat className={`${ICON_CLASS_LARGE} text-zinc-400 opacity-50 cursor-not-allowed`} />
        </ToolTip>
      </div>

      <div className="w-full items-center space-x-2 mt-2 hidden sm:flex">
        <span className="text-xs text-zinc-400">{PROGRESS_TIME.current}</span>
        <div className="h-1 flex-1 bg-zinc-600 rounded-full">
          <div className="h-1 w-1/3 bg-white rounded-full" />
        </div>
        <span className="text-xs text-zinc-400">{PROGRESS_TIME.total}</span>
      </div>
    </div>
  );
}

export { ProjectControls };
