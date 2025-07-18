import { ProjectCard } from '@/components/cards/projectCard';
import { PlaylistHeader } from '@/components/header/playlist/playlistHeader';
import { PlaylistModel } from '@/models/playlistModel';
import { Playlist } from '@/sanity/schema/schema-types';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';

// TODO: add the side bar to all the pages

type PlaylistPageProps = {
  params: Promise<{ playlist_slug: string }>
}

//todo: move this to a constants file
const HOME_ROUTE: Routes = '/portfolio';

async function PlaylistPage({ params }: PlaylistPageProps) {
  let playlist: Playlist = null;

  const { playlist_slug } = await params;
  const isLikedPlaylist = playlist_slug === 'liked-projects';
  const playlistModel = new PlaylistModel()

  if (isLikedPlaylist) {
    playlist = await playlistModel.getLikedPlaylist();
  } else {
    playlist = await playlistModel.getPlaylist(playlist_slug);
  }

  if (!playlist || playlist.playlist.length === 0) {
    return redirect(HOME_ROUTE);
  }

  return (
    <div className="flex-1 overflow-hidden relative">
      <div className=' mx-1 sm:mx-2 gap-2 bg-zinc-900 rounded-2xl overflow-hidden h-full'>
        <div className='w-full h-full overflow-auto'>
          <div className="sticky top-0 z-10 h-8 flex items-center">
            <a className='ml-12'>
              Page still under construction 👷🏽
            </a>
          </div>
          <PlaylistHeader title={playlist.playlist_name} />
          <div
            className="grid gap-1 sm:gap-4 justify-start py-2 sm:px-10 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] 
            [grid-auto-rows:min-content]"
          >
            {playlist.playlist.map((project, i) => (
              <div key={i} className="size-full flex items-center justify-center">
                <ProjectCard
                  key={i}
                  cardDetails={{
                    title: `${project.title}`,
                    slug: project.slug,
                    first_image_url: project.first_image_url,
                    sub_title: `${project.sub_title}`,
                    project_type: project.project_type,
                  }}
                />
              </div >
            ))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default PlaylistPage