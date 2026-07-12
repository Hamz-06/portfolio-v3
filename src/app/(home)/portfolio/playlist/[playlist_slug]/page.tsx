import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getLikedPlaylist, getPlaylist } from '@/models/playlistModel';
import { Playlist } from '@/sanity/schema/schema-types';
import { ProjectRow } from '@/components/list/playlist/projectRow';
import { HOME_PAGE_ROUTE } from '@/constants/pageRoutes';

const LIKED_PROJECTS_SLUG = 'liked-projects';

type PlaylistPageProps = {
  params: Promise<{ playlist_slug: string }>
}

export async function generateMetadata(
  { params }: PlaylistPageProps,
): Promise<Metadata> {
  const { playlist_slug: playlistSlug } = await params;
  const playlist = await getPlaylist(playlistSlug);

  if (!playlist) {
    return {
      title: 'playlist Not Found',
    };
  }

  return {
    title: playlist.playlist_name,
    description: `Explore the playlist: ${playlist.playlist_name}.`,
    keywords: [playlist.type ? `Playlist ${playlist.type}` : 'playlist'],
    openGraph: {
      title: playlist.playlist_name,
      description: playlist.description || playlist.playlist_name || 'No playlist available.',
      images: [
        {
          url: playlist.playlist_cover_image || '',
        }
      ],
    },
  };
}

async function PlaylistPage({ params }: PlaylistPageProps) {
  const { playlist_slug } = await params;
  const isLikedPlaylist = playlist_slug === LIKED_PROJECTS_SLUG;

  const playlist: Playlist | null = isLikedPlaylist
    ? await getLikedPlaylist()
    : await getPlaylist(playlist_slug);

  if (!playlist || playlist.playlist.length === 0) {
    return redirect(HOME_PAGE_ROUTE);
  }

  return (
    <div className="flex-1 h-full w-full sm:pl-1 pr-0 sm:pr-2 pl-2 overflow-hidden">
      <div className="bg-zinc-900 rounded-2xl h-full w-full flex flex-col overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 min-h-full">
          {/* Cover Art + Info */}
          <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-lg shadow-2xl bg-zinc-800 shrink-0">
              <Image
                src={playlist.playlist_cover_image || '/mona-lisa.png'}
                alt={playlist.playlist_name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-400 select-none">
                {playlist.type || 'Playlist'}
              </span>
              <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
                {playlist.playlist_name}
              </h1>
              {playlist.description && (
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  {playlist.description}
                </p>
              )}
              <p className="text-zinc-500 text-xs font-medium mt-1">
                {playlist.playlist.length} {playlist.playlist.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>

          {/* Projects List */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="border-b border-zinc-800 pb-2 mb-2 hidden md:block">
              <div className="flex text-zinc-400 text-xs font-semibold uppercase tracking-wider px-2">
                <div className="w-6 text-center">#</div>
                <div className="flex-1 pl-4">Title</div>
                <div className="pr-4">Category</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {playlist.playlist.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PlaylistPage;