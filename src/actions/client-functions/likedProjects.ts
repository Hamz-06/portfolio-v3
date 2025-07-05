const likedProjectsKey = 'liked-projects';

type LikedProjects = {
  [key: string]: true,
}
const saveLikedProjects = (projectToSave: string): LikedProjects=>{
  try {
    const likedProjects: LikedProjects = JSON.parse(localStorage.getItem('likedProjectsKey') || '{}');
    likedProjects[projectToSave] = true; 
    console.log('Saving liked projects:', likedProjects);
    localStorage.setItem(likedProjectsKey, JSON.stringify(likedProjects));
    return likedProjects;
  } catch (error) {
    console.error("Error saving liked projects:", error);
    return {};
  }
}
const removeLikedProject = (projectToRemove: string): LikedProjects => {
  try {
    const likedProjects: LikedProjects = JSON.parse(localStorage.getItem(likedProjectsKey) || '{}');
    delete likedProjects[projectToRemove];
    localStorage.setItem(likedProjectsKey, JSON.stringify(likedProjects));
    return likedProjects;
  } catch (error) {
    console.error("Error removing liked project:", error);
    return {};
  }
}
export const handleLikedProjects = (projectName: string, liked: boolean): LikedProjects=>{
  if (liked) {
    return saveLikedProjects(projectName);
  }
  return removeLikedProject(projectName);
}

export const isProjectLiked = (projectName:string): boolean => {
  try {
    const likedProjects: LikedProjects = JSON.parse(localStorage.getItem(likedProjectsKey) || '{}');
    return likedProjects[projectName] || false;
  } catch (error) {
    console.error("Error checking if project is liked:", error);
    return false;
  }
}