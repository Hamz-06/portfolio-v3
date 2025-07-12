import { getCookie } from '@/actions/server-actions/cookies/cookieHelper';
import { LikedResponse } from '@/app/api/liked/route';
import { PlaylistResponse } from '@/app/api/playlist/[playlist_slug]/route';
import { ProjectCard } from '@/components/cards/portfolio/projectCards';
import { PlaylistHeader } from '@/components/header/playlistHeader';
import { Playlist } from '@/schema/schema-types';
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

  if (isLikedPlaylist) {
    playlist = await getLikedPlaylist();
  } else {
    playlist = await getPlaylist(playlist_slug);
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

async function getPlaylist(playlistSlug: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/playlist/${playlistSlug}`)
  if (!res.ok) {
    console.error("Failed to fetch playlist data", res.statusText);
    throw new Error("Failed to fetch playlist data");
  }
  return await res.json() as PlaylistResponse
}

async function getLikedPlaylist() {
  const likedProjects = await getCookie<string[]>('likes') || [];

  const res = await fetch(`${process.env.HOST_URL}/api/liked`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likedProjects),
  });

  if (!res.ok) {
    console.error("Failed to fetch liked playlist data", res.statusText);
    throw new Error("Failed to fetch liked playlist data");
  }
  return await res.json() as LikedResponse;
}

export default PlaylistPage