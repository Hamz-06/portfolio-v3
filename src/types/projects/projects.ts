type ProjectTypes = 'projects' | 'certificates' | 'blogs' | 'work-experience'

type SanityProject = {
  title: string,
  first_image_url: string,
  slug: string;
  sub_title: string,
  project_type: ProjectTypes,
}

type SanityHomeQuery = Partial<Record<ProjectTypes, SanityProject[]>>

export type { SanityProject, SanityHomeQuery, ProjectTypes }