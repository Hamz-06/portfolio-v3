"use client"

import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { useProject } from "@/redux/slice/projectPageSlice"
import { formatToMonthYear } from "@/lib/utils"

export function ProjectSummary() {
  const project = useProject()
  if (!project) {
    return <></>
  }

  return (
    <div className="w-full h-full overflow-hidden p-0 project-details-card-background overflow-y-auto">
      {/* Simple Header */}
      <div className="relative p-8">

        {/* Project Info */}
        <div className="space-y-3 text-white">
          <div className="text-sm font-medium text-purple-300 uppercase tracking-wide">{project.project_type}</div>
          <div>
            <DialogTitle className="text-3xl font-bold text-white">{project.title}</DialogTitle>
            <div className="text-zinc-300">{project.date_created && formatToMonthYear(project.date_created)} - Present</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-8">
        {/* Action Buttons & Tech Stack */}
        <div className="space-y-6">
          <div className="flex gap-x-4">
            {project.live_url_link && <div className="flex items-center gap-4">
              <Button
                onClick={() => project.live_url_link && window.open(project.live_url_link, "_blank")}
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full"
              >
                <ExternalLink className="w-4 h-4" />
                Live Project
              </Button>
            </div>}
            {project.github_url_link && <div className="flex items-center gap-4">
              <Button
                onClick={() => project.github_url_link && window.open(project.github_url_link, "_blank")}
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full"
              >
                <ExternalLink className="w-4 h-4" />
                Github Repository
              </Button>
            </div>}
          </div>
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tools_used?.map((tech, index) => (
              <Badge
                key={index}
                className="bg-zinc-800 text-zinc-300 hover:bg-purple-900/50 hover:text-purple-200 
                  border-0 rounded-full px-3 py-1 transition-all duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">About this project</h3>
          <p className="text-zinc-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Achievements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Key Achievements</h3>
          <div className="space-y-3">
            {project.achievements?.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="w-1.5 h-1.5 mt-2 flex-shrink-0"></div>
                <span className="text-zinc-300">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
