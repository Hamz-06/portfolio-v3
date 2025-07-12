
import { defineQuery, } from 'next-sanity'

//todo: simplify this query
//todo: rename all the queries to be more descriptive
export const CATEGORIZED_PROJECTS_HOME_PAGE = defineQuery(
  `{
    "projects": *[project_type == "projects"]|order(date_created desc){
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    },
    "blogs": *[project_type == "blogs"] | order(date_created desc){
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    },
    "work_experience": *[project_type == "work_experience"] | order(date_created desc){
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    }
  }
`
)

export const PROJECT_PROJECT_PAGE = defineQuery(
  `
   *[slug.current == "REPLACE_SLUG"][0]{
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

export const MY_PROFILE = defineQuery(
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

export const PLAYLIST_HOME_PAGE = defineQuery(
  `
  *[_type == "playlists" && slug.current == "REPLACE_SLUG"][0]{
    playlist_name,
    "slug":slug.current,
    "playlist_cover_image":playlist_cover_image.asset->url,
    description,
    pinned,
    type,
    playlist[]->{
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    }
  }
  `
)

export const PLAYLISTS_OVERVIEW = defineQuery(
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

export const MULTIPLE_PROJECTS_QUERY = defineQuery(
  `
  *[
    slug.current in $slugs
  ]{
    title,
    "first_image_url": project_images[0].asset->url,
    "slug": slug.current,
    sub_title,
    project_type
  }
`

)