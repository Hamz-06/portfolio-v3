import "../../globals.css";
import { Header } from "@/components/header/header";

import { Footer } from "@/components/footer/footer";
import { RootLayoutProvider } from "@/redux/provider/rootLayoutProvider";

type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ team: string }>;
}

export default async function RootLayout({
  children,
}: MainLayoutProps) {


  return (
    <RootLayoutProvider>
      <div id='main' className="flex flex-col h-screen text-white">
        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        {children}
        <Footer className="h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}


