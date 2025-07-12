// api/portfolio/[project_type]/[slug]

// lists all projects, blogs to display on the home page
import { PROJECT_PROJECT_PAGE } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";
import { Project } from "@/schema/schema-types";
import { randomProject } from "@/lib/projectsGenerator";
import { client } from "@/sanity/lib/client";
import type { NextRequest } from 'next/server'
import { replaceString } from "@/lib/utils";

export type ProjectPageResponse = Project | null

type Params = { params: Promise<{ slug: string, project_type: string }> }
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        randomProject, { status: 200 }
      )
    }
    // todo: INSTEAD OF REPLACING THE STRING, WE CAN USE GROQ PARAMS
    const replaceStringObjectMap: Record<string, string> = {
      'REPLACE_SLUG': slug
    }
    const UPDATED_QUERY = replaceString(replaceStringObjectMap, PROJECT_PROJECT_PAGE)
    console.log("Updated query:", UPDATED_QUERY)

    const projectResult = await client.fetch<Project>(UPDATED_QUERY, {})
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


