import { defineQuery } from 'next-sanity'

// todo split this file into multiple files

const COMMON_FIELDS = `{
  title,
  "first_image_url": project_images[0].asset->url,
  "slug": slug.current,
  sub_title,
  project_type
}`

export const PROJECTS_BY_CATEGORY_QUERY = defineQuery(`{
  "projects": *[project_type == "projects"] | order(date_created desc) ${COMMON_FIELDS},
  "blogs": *[project_type == "blogs"] | order(date_created desc) ${COMMON_FIELDS},
  "work_experience": *[project_type == "work_experience"] | order(date_created desc) ${COMMON_FIELDS}
}`)


export const SINGLE_PROJECT_QUERY = defineQuery(
  `
   *[slug.current == $slug][0]{
      title,
      "project_images": project_images[].asset->url,
      "slug": slug.current,
      sub_title,
      project_type,
        date_created,
        description,
        primary_color,
        secondary_color,
        tools_used,
        achievements,
        github_url_link,
        live_url_link
    }
  `
)

export const MY_PROFILE_QUERY = defineQuery(
  `
  *[_type == "profile"][0]{
    email_address,
    github_link,
    linkedin_link,
    project_versions[]{
      version_number,
      version_url
    }
  }
`
)

export const SINGLE_PLAYLIST_QUERY = defineQuery(
  `
  *[_type == "playlists" && slug.current == $slug][0]{
    playlist_name,
    "slug":slug.current,
    "playlist_cover_image":playlist_cover_image.asset->url,
    description,
    pinned,
    type,
    playlist[]->${COMMON_FIELDS}
  }
  `
)

// its called summary because it does not include the playlist items
export const PLAYLIST_SUMMARY_LIST_QUERY = defineQuery(
  `
  *[_type == "playlists"] | order(pinned desc){
    playlist_name,
    "slug": slug.current,
    "playlist_cover_image": playlist_cover_image.asset->url,
    description,
    pinned,
    type,
    "playlist_length": count(playlist)
  }
  `
)

export const PROJECTS_BY_SLUGS_QUERY = defineQuery(
  `
  *[
    slug.current in $slugs
  ]{
    title,
    "first_image_url": project_images[0].asset->url,
    "slug": slug.current,
    sub_title,
    project_type
  }`
)