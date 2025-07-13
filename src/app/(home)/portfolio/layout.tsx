import { HomeRouteResponse } from "@/app/api/portfolio/route";
import "../../globals.css";
import { Header } from "@/components/header/header";
import { RootLayoutProvider } from "@/redux/provider/rootLayoutProvider";
import { getCookie } from "@/actions/cookies/cookieHelper";
import { CategorisedProjects, Profile } from "@/sanity/schema/schema-types";
import { ProfileResponse } from "@/app/api/profile/route";
import { CurrentProjectCookieKey } from "@/types/cookieTypes";
import { Footer } from "@/components/footer/footer";

type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ team: string }>;
}

export default async function RootLayout({
  children,
}: MainLayoutProps) {
  const shuffleActive = await getCookie<boolean>('is-shuffling-enabled') || false;
  const currentProjectKey = await getCookie<CurrentProjectCookieKey>('current-project');
  const projects = await getAllProjects()
  const userProfile = await getUserProfile();

  return (
    <RootLayoutProvider
      userProfile={userProfile}
      projects={projects}
      shuffleActive={shuffleActive}
      currentProject={currentProjectKey}>
      <div id='main' className="flex flex-col h-screen text-white">
        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        {children}
        <Footer className="h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}

async function getAllProjects(): Promise<CategorisedProjects> {
  const res = await fetch(`${process.env.HOST_URL}/api/portfolio`) //todo add this route to types
  if (!res.ok) {
    console.error("Failed to fetch project data", res.statusText);
    throw new Error("Failed to fetch project data");
  }
  return await res.json() as HomeRouteResponse;
}

async function getUserProfile(): Promise<NonNullable<Profile>> {
  const res = await fetch(`${process.env.HOST_URL}/api/profile`)
  if (!res.ok) {
    console.error("Failed to fetch user profile", res.statusText);
    throw new Error("Failed to fetch user profile");
  }
  const jsonRes = await res.json() as ProfileResponse;
  if (!jsonRes) {
    throw new Error("User profile not found");
  }
  return jsonRes;
}