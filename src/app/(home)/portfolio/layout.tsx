import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { RootLayoutProvider } from "@/redux/provider/rootLayoutProvider";
import { ResizableLayout } from "@/components/layout/resizableLayout";

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
        <ResizableLayout
          className="flex flex-1 overflow-hidden bg-black">
          {children}
        </ResizableLayout>
        <Footer className="sticky h-[var(--desktop-footer-height)] z-36 bottom-0 w-full bg-black p-2 px-4 flex items-center" />
      </div>
    </RootLayoutProvider>
  );
}


