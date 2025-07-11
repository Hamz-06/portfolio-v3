
// export const setLikedProjectsLocalStorage = (projectToSave: string[]): string[]=>{
//   try {
//     localStorage.setItem('likes', JSON.stringify(projectToSave));
//     return projectToSave;
//   } catch (error) {
//     localStorage.setItem('likes', '[]'); // Reset in case of error
//     console.error("Error saving liked projects:", error);
//     return [];
//   }
// }


// export const getLikedProjectsLocalStorage = (): string[] => {
//   try {
//     const likedProjects: string[] = JSON.parse(localStorage.getItem('likes') || '[]');
//     console.log('Retrieved liked projects:', likedProjects);
//     return likedProjects;
//   } catch (error) {
//     localStorage.setItem('likes', '[]'); // Reset in case of error
//     console.error("Error retrieving liked projects:", error);
//     return [];   
//   }
// }

// export const isProjectLiked = (projectName:string): boolean => {
//   try {
//     const likedProjects: string[] = JSON.parse(localStorage.getItem('likes') || '[]');
//     return likedProjects?.includes(projectName) || false;
//   } catch (error) {
//     console.error("Error checking if project is liked:", error);
//     return false;
//   }
// }