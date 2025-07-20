import React from 'react'
import { ProjectCard } from '../cards/projectCard'
import { PlaylistHeader } from '../header/playlist/playlistHeader'
import { Playlist } from '@/sanity/schema/schema-types';
import { Routes } from '@/types/routes';
import { PlaylistModel } from '@/models/playlistModel';
import { redirect } from 'next/navigation';

//todo: move this to a constants file
const HOME_ROUTE: Routes = '/portfolio';


type PlaylistPageProviderProps = {
  playlistSlugs: string;
}
async function PlaylistPageProvider({ playlistSlugs }: PlaylistPageProviderProps) {
  let playlist: Playlist = null;

  const isLikedPlaylist = playlistSlugs === 'liked-projects';
  const playlistModel = new PlaylistModel()

  if (isLikedPlaylist) {
    playlist = await playlistModel.getLikedPlaylist();
  } else {
    playlist = await playlistModel.getPlaylist(playlistSlugs);
  }

  if (!playlist || playlist.playlist.length === 0) {
    return redirect(HOME_ROUTE);
  }

  return (
    <>
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
    </>
  )
}

export { PlaylistPageProvider }