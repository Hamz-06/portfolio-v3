
type ProjectRoute = `/portfolio/${string}/${string}`
type HomePageRoute = `/portfolio`
type PlaylistRoute = `/portfolio/playlist/${string}`


export const HOME_PAGE_ROUTE: HomePageRoute = '/portfolio';

export const PLAYLIST_PAGE_ROUTE = (playlistSlug: string): PlaylistRoute => {
  return `/portfolio/playlist/${playlistSlug}`;
};

export const PROJECT_PAGE_ROUTE = (projectType: string, projectSlug: string): ProjectRoute => {
  return `/portfolio/${projectType}/${projectSlug}`;
};