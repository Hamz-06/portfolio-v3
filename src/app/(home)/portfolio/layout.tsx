import { HomeRouteResponse } from "@/app/(api)/api/home/route";
import "../../globals.css";
import Footer from "@/components/footer/spotify/footer";
import Header from "@/components/header/header";
import { SanityHomeQuery } from "@/types/projects/projects";
import { MainLayoutProvider } from "@/redux/provider/mainLayoutProvider";
import { getCurrentProjectIndexCookie } from "@/server-actions/cookies/currentProjectCookie";


type MainLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ team: string }>;
}

export default async function RootLayout({
  children,
  // modal,
}: MainLayoutProps) {
  const projects = await getAllProjects()
  const currentProjectIndex = await getCurrentProjectIndex()
  return (
    <MainLayoutProvider projects={projects} currentProject={currentProjectIndex}>
      <div className="flex flex-col h-screen text-white">

        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />

        {children}

        <Footer className="h-[var(--desktop-footer-height)] fixed z-38 bottom-0 w-full bg-black p-2 flex items-center" />

      </div>
      {/* {modal} */}
    </MainLayoutProvider>
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

async function getCurrentProjectIndex(): Promise<number | null> {
  return await getCurrentProjectIndexCookie()
}
