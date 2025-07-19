import { PlaylistPageProvider } from '@/components/layout/playlistPageProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';

// TODO: add the side bar to all the pages

type PlaylistPageProps = {
  params: Promise<{ playlist_slug: string }>
}


async function PlaylistPage({ params }: PlaylistPageProps) {

  const { playlist_slug: playlistSlug } = await params;

  return (
    <div className="flex-1 overflow-hidden relative">
      <div className=' mx-1 sm:mx-2 gap-2 bg-zinc-900 rounded-2xl overflow-hidden h-full'>
        <div className='w-full h-full overflow-auto'>
          <div className="sticky top-0 z-10 h-8 flex items-center">
            <a className='ml-12'>
              Page still under construction 👷🏽
            </a>
          </div>

          {/* duplicate suspense code */}
          <Suspense
            fallback={
              <Skeleton className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
              </Skeleton>
            }>
            <PlaylistPageProvider playlistSlugs={playlistSlug} />
          </Suspense>
        </div>
      </div>
    </div>

  )
}

export default PlaylistPage