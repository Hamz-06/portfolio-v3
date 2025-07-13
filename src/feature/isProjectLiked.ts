'use server'

export const isProjectLiked = async (slug: string, likedProject: string[] | null): Promise<boolean> => {
  if (!likedProject) {
    return false
  }

  return likedProject.includes(slug);

}