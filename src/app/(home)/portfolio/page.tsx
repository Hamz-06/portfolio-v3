import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects Summary',
  description: 'A summary of blogs, projects and work experience',
}

export default async function Home() {

  return (
    <div className="sm:pl-1 pr-0 sm:pr-2 pl-0 h-full">
      <div
        className="rounded-2xl bg-zinc-900 relative overflow-auto h-full"
        id="main-content">
        <FilterBarHeader />
        <ProjectList />
      </div>
    </div>
  );
}



