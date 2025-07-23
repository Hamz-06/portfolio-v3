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
      <div id='main' className="flex flex-col h-dvh text-white">
        <Header className="flex-shrink-0 h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        {children}
        <Footer className="flex-shrink-0 sticky h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}


