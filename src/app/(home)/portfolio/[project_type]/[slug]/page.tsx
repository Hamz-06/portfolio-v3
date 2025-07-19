import React, { Suspense } from 'react';
import { ProjectMainPageProvider } from '@/components/layout/project/projectMainPage';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle } from 'lucide-react';

type ProjectPageProps = {
  params: Promise<{ slug: string; project_type: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={
      <Skeleton className='w-full h-full bg-zinc-900 flex items-center justify-center'>
        <LoaderCircle className="animate-spin" />
      </Skeleton>
    }>

      <ProjectMainPageProvider slug={slug} />
    </Suspense>
  );
}
