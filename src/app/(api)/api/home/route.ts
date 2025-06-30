// api/home
// lists all projects, blogs to display on the home page
import { client } from "@/sanity/lib/client";
import { POST_QUERY_ALL } from "@/sanity/lib/queries";
import { SanityHomeQuery } from "@/types/projects/projects";
import { NextResponse } from "next/server";


export type HomeRouteResponse = SanityHomeQuery

export async function GET() {
  try {
    console.log("Fetching data from Sanity...")
    return NextResponse.json(
      mockData, { status: 200 })

    const queryAllEntries = await client.fetch<SanityHomeQuery>(POST_QUERY_ALL, {})

    console.log("queryAllEntries", queryAllEntries)

    return NextResponse.json<HomeRouteResponse>(
      queryAllEntries, { status: 200 })

  } catch (error) {
    console.error("Error fetching data from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}


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

const mockData = {
  projects: createRandomProjects('projects', 10),
  blogs: createRandomProjects('blogs', 5),
  shoe: createRandomProjects('projects', 5),
};