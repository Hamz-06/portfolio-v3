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
      <div id='main' className="flex flex-col min-h-svh sm:h-screen text-white bg-amber-300">
        <Header className="h-[var(--desktop-header-height)] bg-black flex items-center px-4 sticky top-0 z-38" />
        <ResizableLayout
          className="flex flex-1 overflow-hidden bg-black">
          {children}
        </ResizableLayout>
        <Footer />
      </div>
    </RootLayoutProvider>
  );
}
