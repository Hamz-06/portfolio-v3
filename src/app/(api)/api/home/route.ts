// api/home
// lists all projects, blogs to display on the home page
import { client } from "@/sanity/lib/client";
import { POST_QUERY_ALL } from "@/sanity/lib/queries";
import { SanityHomeQuery } from "@/types/projects/projects";
import { NextResponse } from "next/server";


export type HomeRouteResponse = SanityHomeQuery

export async function GET() {
  try {

    return NextResponse.json(mockData()

      , { status: 200 })

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
function mockData(): SanityHomeQuery {
  const mockData: SanityHomeQuery = {
    projects: [
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
    ],
    blogs: [
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
      {
        title: 'Portfolio Website',
        first_image_url: '/bart-simpson-cartoon.png',
        slug: 'portfolio-website',
        sub_title: 'A modern web portfolio built with Next.js',
        project_type: 'projects',
      },
    ]
  }
  return mockData
}