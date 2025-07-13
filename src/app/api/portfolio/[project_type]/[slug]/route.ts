// api/portfolio/[project_type]/[slug]

// lists all projects, blogs to display on the home page
import { SINGLE_PROJECT_QUERY } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";
import { Project } from "@/sanity/schema/schema-types";
import { randomProject } from "@/lib/dev/projectsGenerator";
import { client } from "@/sanity/lib/client";
import type { NextRequest } from 'next/server'

export type ProjectPageResponse = Project | null

type Params = { params: Promise<{ slug: string, project_type: string }> }
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { slug: projectName } = await params;

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        randomProject, { status: 200 }
      )
    }


    const projectResult = await client.fetch<Project>(SINGLE_PROJECT_QUERY, {
      slug: projectName
    })
    if (!projectResult) {
      return NextResponse.json<ProjectPageResponse>(
        null, { status: 200 }
      )
    }

    return NextResponse.json<ProjectPageResponse>(
      projectResult, { status: 200 })

  } catch (error) {
    console.error("Error fetching data from Sanity:", error) //todo add logging service
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}


