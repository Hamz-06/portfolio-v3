
import { defineQuery, } from 'next-sanity'

export const POST_QUERY_ALL = defineQuery(`
{
  "projects":*[_type == "projects"]{
    title,
    "first_image_url": project_images[0].asset->url,
    "slug": slug.current,
    "sub_title": sub_title,
    "project_type": project_type,
  
  }
}
`)