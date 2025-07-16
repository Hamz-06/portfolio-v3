import "../../globals.css";
import { Header } from "@/components/header/header";
import { RootLayoutProvider } from "@/redux/provider/rootLayoutProvider";
import { getCookie } from "@/actions/cookies/cookieHelper";
import { CurrentProjectCookieKey } from "@/types/cookieTypes";
import { Footer } from "@/components/footer/footer";
import { ProfileModel } from "@/models/profileModel";
import { ProjectsModel } from "@/models/projectsModel";

type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ team: string }>;
}

export default async function RootLayout({
  children,
}: MainLayoutProps) {
  const shuffleActive = await getCookie<boolean>('is-shuffling-enabled') || false;
  const currentProjectKey = await getCookie<CurrentProjectCookieKey>('current-project');

  const projectsSummary = await ProjectsModel.getInstance().getProjectSummary()
  const userProfile = await new ProfileModel().getProfile();

  if (!userProfile) {
    console.error("Failed to fetch user profile");
    return <div>Error loading user profile</div>;
  }
  return (
    <RootLayoutProvider
      userProfile={userProfile}
      projects={projectsSummary}
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


