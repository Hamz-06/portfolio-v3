// api/home
// lists all projects, blogs to display on the home page
import { randomCategorisedProjects } from "@/lib/projectsGenerator";
import { client } from "@/sanity/lib/client";
import { CATEGORIZED_PROJECTS_HOME_PAGE } from "@/sanity/lib/queries";
import { CategorisedProjects } from "@/schema/schema-types";
import { NextResponse } from "next/server";

export type HomeRouteResponse = CategorisedProjects

export async function GET() {
  try {

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<HomeRouteResponse>(
        randomCategorisedProjects, { status: 200 }
      )
    }

    const queryAllEntries = await client.fetch<CategorisedProjects>(CATEGORIZED_PROJECTS_HOME_PAGE, {})

    return NextResponse.json<HomeRouteResponse>(
      queryAllEntries, { status: 200 })

  } catch (error) {
    console.error("Error fetching data from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
