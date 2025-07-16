import { DEFAULT_KV_EXPIRATION, PROFILE_KV_CACHE } from "@/const";
import { profileGenerator } from "@/lib/dev/profileGenerator"
import { client } from "@/sanity/lib/client"
import { MY_PROFILE_QUERY } from "@/sanity/lib/queries"
import { Profile } from "@/sanity/schema/schema-types"
import { getCloudflareContext } from "@opennextjs/cloudflare";

class ProfileModel {
  private profileKv: KVNamespace<string>;
  constructor() {
    this.profileKv = getCloudflareContext().env.PROFILE_KV_CACHE;
  }

  async getProfile(): Promise<Profile> {
    if (process.env.NODE_ENV !== 'production') {
      return profileGenerator
    }
    const cachedProfile = await this.profileKv.get<Profile>('PROFILE_KV_CACHE', { type: 'json' });
    if (cachedProfile) {
      console.log("Found profile in KV cache.");
      return cachedProfile;
    }

    const myProfile = await client.fetch<Profile>(MY_PROFILE_QUERY)

    getCloudflareContext().ctx.waitUntil(
      this.profileKv.put(
        PROFILE_KV_CACHE.MY_PROFILE,
        JSON.stringify(myProfile),
        { expirationTtl: DEFAULT_KV_EXPIRATION }
      )
    );
    console.log("Fetched profile from Sanity and stored in KV cache.");
    return myProfile;
  }
}

export { ProfileModel }