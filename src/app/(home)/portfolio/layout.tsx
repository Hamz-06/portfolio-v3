import { HomeRouteResponse } from "@/app/(api)/api/home/route";
import "../../globals.css";
import Footer from "@/components/footer/spotify/footer";
import { Header } from "@/components/header/header";
import { RootLayoutProvider } from "@/redux/provider/rootLayoutProvider";
import { SanityHomeQuery } from "@/types/projects/projects";
import { getCookie } from "@/actions/server-actions/cookies/cookieHelper";
import { CurrentProjectKey } from "@/actions/server-actions/cookies/currentProjectCookie";
// import { getCurrentProjectIndexCookie } from "@/actions/server-actions/cookies/currentProjectCookie";

type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ team: string }>;
}

export default async function RootLayout({
  children,
}: MainLayoutProps) {
  const shuffleActive = await getCookie<boolean>('is-shuffling-enabled') || false;
  const currentProjectKey = await getCookie<CurrentProjectKey>('current-project');
  const projects = await getAllProjects()
  return (
    <RootLayoutProvider projects={projects} shuffleActive={shuffleActive} currentProject={currentProjectKey}>
      <div id='main' className="flex flex-col h-screen text-white">
        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        {children}
        <Footer className="h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}

async function getAllProjects(): Promise<SanityHomeQuery> {
  const res = await fetch(`${process.env.HOST_URL}/api/home`)
  if (!res.ok) {
    console.error("Failed to fetch project data", res.statusText);
    throw new Error("Failed to fetch project data");
  }
  return await res.json() as HomeRouteResponse;
}
