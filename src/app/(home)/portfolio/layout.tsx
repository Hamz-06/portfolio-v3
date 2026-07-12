import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { ResizableLayout } from "@/components/layout/resizableLayout";
import { getCookie } from "@/actions/cookies/cookieHelper";
import { RootLayoutProvider } from "@/redux/provider/rootProvider";

type MainLayoutProps = {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: MainLayoutProps) {
  const isShuffleEnabled = await getCookie<boolean>('is-shuffling-enabled');

  return (
    <RootLayoutProvider
      shuffleActive={isShuffleEnabled || false}
    >
      <div id='main' className="flex flex-col min-h-svh sm:h-screen text-white bg-black">
        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        <ResizableLayout
          className="flex flex-1 overflow-hidden">
          {children}
        </ResizableLayout>
        <Footer className="sticky h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 px-4 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}
