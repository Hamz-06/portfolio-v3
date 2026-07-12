'use client'
import { usePathname, useRouter } from "next/navigation";
import { SkipBack, SkipForward } from "lucide-react";
import ToolTip from "../tooltip/tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { navigateCurrentProject } from "@/helper/navigateProjects";
import { useTRPC } from "@/backend/trpc/provider";
import { useQuery } from "@tanstack/react-query";
import { CurrentProjectCookieKey } from "@/types/cookieTypes";
import { getClientCookie } from "@/helper/cookieHelperClient";
import { PROJECT_PAGE_ROUTE } from "@/constants/pageRoutes";

type Props = {
  direction: NavigationStep;
  className?: string;
};
export type NavigationStep = "previous" | "next" | 'play';


export function ProjectNavigationButton({
  direction,
  className,
}: Props) {
  const tooltip = direction === "previous" ? "Previous Project" : "Next Project";
  const router = useRouter();
  const pathname = usePathname();
  const trpc = useTRPC()

  const { data: allProjects } = useQuery(
    trpc.portfolio.getAllProjectsFlatList.queryOptions()
  )

  const navigate = () => {
    if (!allProjects) return

    const isShuffleEnabled = getClientCookie<boolean>('is-shuffling-enabled') ?? false;
    const currentProjectCookie = getClientCookie<CurrentProjectCookieKey>('current-project');
    const navigatedProject = navigateCurrentProject(allProjects, currentProjectCookie, direction, isShuffleEnabled);
    if (!navigatedProject) {
      return;
    }

    const nextPath = PROJECT_PAGE_ROUTE(navigatedProject.projectType, navigatedProject.projectSlug)

    if (pathname === nextPath) {
      return;
    }

    router.push(nextPath);
  };

  const Icon = direction === "next" ? SkipForward : SkipBack;

  return (
    <ToolTip tooltipContent={tooltip}>
      <Button
        asChild
        variant="ghost"
        size="icon"
        onClick={navigate}
        className={cn(`text-zinc-400 hover:text-white`)}
      >
        <Icon className={cn(className)} />
      </Button>
    </ToolTip>
  );
}