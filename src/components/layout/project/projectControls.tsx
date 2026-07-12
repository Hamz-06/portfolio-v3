'use client';

import { Heart, Info } from 'lucide-react';
import ToolTip from '@/components/tooltip/tooltip';
import { useCurrentProjectLiked, useLikedProjectsStore } from '@/zustand/likedProjects';
import { toggleDisplayProjectDetailsModal, useDisplayProjectDetailsModal } from '@/zustand/projectDetailsModal';
import { cn } from '@/lib/utils';
import { useTRPC } from '@/backend/trpc/provider';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type ControlButton = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  visible?: boolean;
};

type ProjectControlsProps = {
  className?: string;
};

function ProjectControls({ className }: ProjectControlsProps): React.ReactElement {
  const trpc = useTRPC();
  const params = useParams<{ project_type: string; slug: string }>();
  const isLiked = useCurrentProjectLiked();
  const detailsOpen = useDisplayProjectDetailsModal();
  const currentProjectLiked = useLikedProjectsStore((state) => state.currentProjectLiked);
  const setLikedProject = useLikedProjectsStore((state) => state.setLikedProject);

  const { data: project } = useQuery(
    trpc.portfolio.getProject.queryOptions({ slug: params.slug })
  );

  if (!project) {
    return <></>;
  }

  const handleToggleLike = () => {
    currentProjectLiked(!isLiked);
    setLikedProject(project.slug);
  };

  const handleOpenDetails = () => {
    toggleDisplayProjectDetailsModal();
  };

  const controls: ControlButton[] = [
    {
      label: 'Project Information',
      icon: <Info className="block stroke-2 text-zinc-300 stroke-zinc-300 hover:text-white hover:stroke-white transition-colors" />,
      onClick: handleOpenDetails,
      visible: !detailsOpen,
    },
    {
      label: 'Like Project',
      icon: (
        <Heart
          fill={isLiked ? 'currentColor' : 'none'}
          className={cn(
            'block stroke-2 transition-colors',
            isLiked ? 'text-rose-500 stroke-rose-500' : 'text-zinc-300 stroke-zinc-300 hover:text-white hover:stroke-white'
          )}
        />
      ),
      onClick: handleToggleLike,
    },
  ].filter((control) => control.visible !== false);

  return (
    <div className={className}>
      {controls.map((control) => (
        <ToolTip key={control.label} tooltipSide="bottom" tooltipContent={control.label}>
          <button
            onClick={control.onClick}
            className="inline-flex h-9 w-9 items-center justify-center p-2 mx-1 rounded-full leading-none transition-colors cursor-pointer hover:bg-white/15 hover:shadow-none"
            aria-label={control.label}
          >
            {control.icon}
          </button>
        </ToolTip>
      ))}
    </div>
  );
}

export { ProjectControls };