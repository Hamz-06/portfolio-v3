
import { defineQuery, } from 'next-sanity'

export const CATEGORIZED_PROJECTS_HOME_PAGE = defineQuery(
  `{
    "projects": *[project_type == "projects"]{
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    },
    "blogs": *[project_type == "blogs"]{
      title,
      "first_image_url": project_images[0].asset->url,
      "slug": slug.current,
      sub_title,
      project_type
    },
    "work_experience": *[project_type == "work_experience"]{
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
        tools_used
        
    }
  `
)