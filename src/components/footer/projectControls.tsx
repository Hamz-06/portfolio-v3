'use client';
import { Repeat } from "lucide-react";
import { ProjectNavigationButton } from "../button/projectNavigationButton";
import { PlayButton } from "../button/playButton";
import { ShuffleButton } from "../button/shuffleButton";


function ProjectControls() {

  return (
    <div className="flex flex-col items-center w-full sm:w-1/3">
      <div className="flex items-center space-x-7 sm:space-x-4">

        <ShuffleButton className="h-6 w-6 sm:h-5 sm:w-5" />

        <ProjectNavigationButton direction="previous" className="h-8 w-8 sm:h-5 sm:w-5" />

        <PlayButton />

        <ProjectNavigationButton direction="next" className="h-8 w-8 sm:h-5 sm:w-5" />

        <Repeat className="w-6 h-6 sm:h-5 sm:w-5 text-zinc-400" />
      </div>

      <div className="w-full items-center space-x-2 mt-2 hidden sm:flex">
        <span className="text-xs text-zinc-400">1:23</span>
        <div className="h-1 flex-1 bg-zinc-600 rounded-full">
          <div className="h-1 w-1/3 bg-white rounded-full"></div>
        </div>
        <span className="text-xs text-zinc-400">3:45</span>
      </div>
    </div>
  );
}

export { ProjectControls };
