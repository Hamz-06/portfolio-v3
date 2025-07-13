// api/profile

import { profileGenerator } from "@/lib/dev/profileGenerator";
import { client } from "@/sanity/lib/client";
import { MY_PROFILE } from "@/sanity/lib/queries";
import { Profile } from "@/schema/schema-types";
import { NextResponse } from "next/server";

export type ProfileResponse = Profile

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json<ProfileResponse>(
        profileGenerator, { status: 200 }
      )
    }
    const profile = await client.fetch<Profile>(MY_PROFILE, {})

    return NextResponse.json<ProfileResponse>(
      profile, { status: 200 })

  } catch (error) {
    console.error("Error fetching profile from Sanity:", error)
    return NextResponse.json({
      message: "internal server error",
    }, { status: 500 })
  }
}
