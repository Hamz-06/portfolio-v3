import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio-2025')
    .items([
      S.documentTypeListItem('projects').title('Projects'),
      S.documentTypeListItem('profile').title('Profile'),
      S.documentTypeListItem('playlists').title('Playlists'),
    ])
