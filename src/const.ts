

export enum PLAYLIST_KV_CACHE {
  PLAYLIST_SUMMARY = 'playlist_summary',
  PLAYLIST = 'playlist_key'
}

export enum PROFILE_KV_CACHE {
  MY_PROFILE = 'my_profile'
}

export enum PROJECT_KV_CACHE {
  PROJECT_SUMMARY = 'project_summary',
  PROJECT = 'project_key'
}

export const DEFAULT_KV_EXPIRATION = 60 * 60 * 24 * 1; // 1 day
