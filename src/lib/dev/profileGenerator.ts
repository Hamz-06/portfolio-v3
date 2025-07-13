import { Profile } from "@/schema/schema-types";

export const profileGenerator: Profile = {
  email_address: "test@email.com",
  github_link: 'https://github.com/dummy',
  linkedin_link: 'https://linkedin.com/in/dummy',
  project_versions: [
    {
      version_number: "1.0.0",
      version_url: "https://example.com/version-1.0.0",
    }, {
      version_number: "2.0.0",
      version_url: "https://example.com/version-1.1.0",
    }
  ]
}