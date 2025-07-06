// this is used as a mock data generator for projects and blogs for development purposes

import { CategorisedProjects, Project, ProjectTypes } from "@/schema/schema-types";


const images = ['/bart-simpson-cartoon.png', '/mona-lisa.png'];

const randomSlug = (base: string, i: number) => `${base}-${i + 1}`;
const randomImage = () => images[Math.floor(Math.random() * images.length)];

const createRandomProjects = (type: ProjectTypes, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    title: `Project (THIS will be a big title omds hi how are you doing today?)`,
    first_image_url: randomImage(),
    slug: randomSlug(type, i),
    sub_title: `This is project number ${i + 1}`,
    project_type: type,
  }));

const randomCategorisedProjects: CategorisedProjects = {
  projects: createRandomProjects('projects', 3),
  blogs: createRandomProjects('blogs', 6),

  work_experience: createRandomProjects('work_experience', 2)
};

const randomProject: Project = {
  title: "Sample Project",
  project_images: ["/mona-lisa.png", "/spotify-wrapped.png"],
  slug: "sample-project",
  sub_title: "This is a sample project",
  project_type: "projects",
  date_created: new Date().toISOString(),
  description: "This is a detailed description of the sample project.",
  primary_color: "#FF5733",
  secondary_color: "#33FF57",
  tools_used: ["Tool1", "Tool2", "Tool3"],
  achievements: ["Achievement 1", "Achievement 2"],
  github_url_link: "https://github.com",
  live_url_link: "https://example.com",

}
export { randomCategorisedProjects, randomProject }