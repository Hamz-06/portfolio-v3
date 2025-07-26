'use client'
import { useDispatch } from "react-redux";
import { navigateCurrentProject, useCurrentProject } from "@/redux/slice/projectDataSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import ToolTip from "../tooltip/tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  direction: NavigationStep;
  tooltip?: string;
  className?: string;
};
export type NavigationStep = "previous" | "next";


export function ProjectNavigationButton({
  direction,
  tooltip = direction === "next" ? "Next Project" : "Previous Project",
  className,
}: Props) {
  const dispatch = useDispatch();
  const currentProject = useCurrentProject();
  const router = useRouter();
  const pathname = usePathname();
  const [redirect, setRedirect] = useState(false);

  const navigate = () => {
    dispatch(navigateCurrentProject(direction));
    setRedirect(true);
  };

  useEffect(() => {
    if (!redirect || !currentProject) return;

    const nextPath = `/portfolio/${currentProject.project_type}/${currentProject.slug}`;

    if (pathname === nextPath) {
      return;
    }

    router.push(nextPath);
    setRedirect(false);
  }, [redirect, currentProject]);

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