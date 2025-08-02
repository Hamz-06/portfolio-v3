// this is used as a mock data generator for projects and blogs for development purposes

import { CategorisedProject, CategorisedProjects, Project } from "@/sanity/schema/schema-types";


// const images = ['/bart-simpson-cartoon.png', '/mona-lisa.png'];

// const randomSlug = (base: string, i: number) => `${base}-${i + 1}`;
// const randomImage = () => images[Math.floor(Math.random() * images.length)];

// const createRandomProjects = (type: ProjectTypes, count: number) =>
//   Array.from({ length: count }, (_, i) => ({
//     title: `Project ${i + 1}`,
//     first_image_url: randomImage(),
//     slug: randomSlug(type, i),
//     sub_title: `This is project number ${i + 1}`,
//     project_type: type,
//   }));
export const projects: CategorisedProject[] = [
  {
    first_image_url: '/mona-lisa.png',
    title: 'Mona Lisa',
    slug: 'mona-lisa',
    sub_title: 'A masterpiece by Leonardo da Vinci',
    project_type: 'projects',
  }, {
    first_image_url: '/bart-simpson-cartoon.png',
    title: 'Work Experience Project',
    slug: 'work-experience-project',
    sub_title: 'A project showcasing work experience',
    project_type: 'work_experience',
  }, {
    first_image_url: '/playlist-heart.png',
    title: 'Liked Projects',
    slug: 'liked-projects',
    sub_title: 'A collection of liked projects',
    project_type: 'work_experience',
  }, {
    first_image_url: '/bart-simpson-cartoon.png',
    title: 'Blog Post Example',
    slug: 'blog-post-example',
    sub_title: 'An example blog post',
    project_type: 'blogs',
  }
]

const randomCategorisedProjects: CategorisedProjects = {
  projects: [projects[0]],
  blogs: [projects[3]],
  work_experience: [projects[1], projects[2]],
  education: []
};



const projectSelected = (slug: string): Project => {
  const project = projects.find(p => p.slug === slug);
  if (!project) throw new Error(`Project with slug ${slug} not found`);

  return {
    title: project.title,
    project_images: [project.first_image_url, '/bart-simpson-cartoon.png'],
    slug: slug,
    sub_title: project.sub_title,
    project_type: project.project_type,
    date_created: new Date().toISOString(),
    description: "This is a detailed description of the sample project.",
    primary_color: '#0000FF',
    secondary_color: "#33FF57",
    tools_used: ["Tool1", "Tool2", "Tool3"],
    achievements: ["Achievement 1", "Achievement 2"],
    github_url_link: "https://github.com",
    live_url_link: "https://example.com",
  };
}



export { randomCategorisedProjects, projectSelected }