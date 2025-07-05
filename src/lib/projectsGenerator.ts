// this is used as a mock data generator for projects and blogs for development purposes

import { CategorisedProjects, Project } from "@/schema/schema-types";


const images = ['/bart-simpson-cartoon.png', '/mona-lisa.png'];

const randomSlug = (base: string, i: number) => `${base}-${i + 1}`;
const randomImage = () => images[Math.floor(Math.random() * images.length)];

const createRandomProjects = (type: 'projects' | 'blogs', count: number) =>
  Array.from({ length: count }, (_, i) => ({
    title: `Project ${i + 1}`,
    first_image_url: randomImage(),
    slug: randomSlug(type, i),
    sub_title: `This is project number ${i + 1}`,
    project_type: type,
  }));

const randomCategorisedProjects: CategorisedProjects = {
  projects: createRandomProjects('projects', 10),
  blogs: createRandomProjects('blogs', 5),
  work_experience: []
};

const randomProject: Project = {
  title: "Sample Project",
  project_images: ["/sample-image-1.png", "/sample-image-2.png"],
  slug: "sample-project",
  sub_title: "This is a sample project",
  project_type: "projects",
  date_created: new Date().toISOString(),
  description: "This is a detailed description of the sample project.",
  primary_color: "#FF5733",
  secondary_color: "#33FF57",
  tools_used: ["Tool1", "Tool2", "Tool3"]

}
export { randomCategorisedProjects,randomProject}