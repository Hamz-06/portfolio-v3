const likedProjectsKey = 'liked-projects';

type LikedProject = {
  [key: string]: true,
}
export const saveLikedProjects = (projectToSave: string): LikedProject=>{
  try {
    const likedProjects: LikedProject = JSON.parse(localStorage.getItem('likedProjectsKey') || '{}');
    likedProjects[projectToSave] = true; 
    console.log('Saving liked projects:', likedProjects);
    localStorage.setItem(likedProjectsKey, JSON.stringify(likedProjects));
    return likedProjects;
  } catch (error) {
    console.error("Error saving liked projects:", error);
    return {};
  }
}
export const removeLikedProject = (projectToRemove: string): LikedProject => {
  try {
    const likedProjects: LikedProject = JSON.parse(localStorage.getItem(likedProjectsKey) || '{}');
    delete likedProjects[projectToRemove];
    localStorage.setItem(likedProjectsKey, JSON.stringify(likedProjects));
    return likedProjects;
  } catch (error) {
    console.error("Error removing liked project:", error);
    return {};
  }
}

export const isProjectLiked = (projectName:string): boolean => {
  try {
    const likedProjects: LikedProject = JSON.parse(localStorage.getItem(likedProjectsKey) || '{}');
    return likedProjects[projectName] || false;
  } catch (error) {
    console.error("Error checking if project is liked:", error);
    return false;
  }
}