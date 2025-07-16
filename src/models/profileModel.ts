import { profileGenerator } from "@/lib/dev/profileGenerator"
import { client } from "@/sanity/lib/client"
import { MY_PROFILE_QUERY } from "@/sanity/lib/queries"
import { Profile } from "@/sanity/schema/schema-types"

class ProfileModel {
  async getProfile(): Promise<Profile> {
    if (process.env.NODE_ENV !== 'production') {
      return profileGenerator
    }
    return await client.fetch<Profile>(MY_PROFILE_QUERY)
  }
}

export { ProfileModel }