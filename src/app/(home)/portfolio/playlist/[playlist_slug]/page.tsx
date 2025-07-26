import { ProjectCard } from '@/components/cards/projectCard';
import { PlaylistHeader } from '@/components/header/playlist/playlistHeader';
import { PlaylistModel } from '@/models/playlistModel';
import { PlaylistsProvider } from '@/redux/provider/playlistProvider';
import { Playlist } from '@/sanity/schema/schema-types';
import { Routes } from '@/types/routes';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

// TODO: add the side bar to all the pages

type PlaylistPageProps = {
  params: Promise<{ playlist_slug: string }>
}

export async function generateMetadata(
  { params }: PlaylistPageProps,
): Promise<Metadata> {
  const { playlist_slug: playlistSlug } = await params;
  const playlist = await PlaylistModel.getInstance().getPlaylist(playlistSlug);

  if (!playlist) {
    return {
      title: 'playlist Not Found',
    };
  }
  //improve keywords
  return {
    title: playlist.playlist_name,
    description: `Explore the playlist: ${playlist.playlist_name}.`,
    keywords: [playlist.type ? `Playlist ${playlist.type}` : 'playlist'],
    openGraph: {
      title: `${playlist.playlist_name} Playlist display`,
      description: playlist.playlist_name || 'No playlist available.',
      images: [
        {
          url: playlist.playlist_cover_image || '',
        }
      ],
    },
  };

}

//todo: move this to a constants file
const HOME_ROUTE: Routes = '/portfolio';

async function PlaylistPage({ params }: PlaylistPageProps) {
  let playlist: Playlist = null;

  const { playlist_slug } = await params;
  const isLikedPlaylist = playlist_slug === 'liked-projects';


  if (isLikedPlaylist) {
    playlist = await PlaylistModel.getInstance().getLikedPlaylist();
  } else {
    playlist = await PlaylistModel.getInstance().getPlaylist(playlist_slug);
  }

  if (!playlist || playlist.playlist.length === 0) {
    return redirect(HOME_ROUTE);
  }

  return (
    <PlaylistsProvider>
      <div className="flex-1 overflow-hidden relative w-full h-full sm:pl-1 pr-0 sm:pr-2 pl-2">
        <div className="bg-zinc-900 rounded-2xl h-full w-full">
          <div className="sticky top-0 z-10 h-8 flex items-center">
            <a className='ml-12'>
              Page still under construction 👷🏽
            </a>
          </div>
          <PlaylistHeader title={playlist.playlist_name} />
          <div className="flex flex-wrap flex-row gap-3 p-2">
            {playlist.playlist.map((project, i) => (
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
            ))
            }
          </div>
        </div>
      </div>
    </PlaylistsProvider >
  )
}

export default PlaylistPage