
import "../../globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    // <html>
    // <body>
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="h-16 bg-black flex items-center px-4 sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden relative">
        <ResizablePanelGroup direction="horizontal">
          {/* Sidebar - Resizable */}
          <ResizablePanel defaultSize={20} minSize={20} maxSize={25} className="hidden lg:block">
            <div className="flex-col h-full bg-zinc-900 p-3 gap-2 rounded-2xl ml-2 mr-1">
              <Sidebar />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main content - Resizable */}
          <ResizablePanel className="flex-1 overflow-auto mr-2 ml-1 gap-2 rounded-2xl bg-zinc-900">
            {/* <div className=""> */}
            {children}
            {/* </div> */}
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>

      {/* footer */}
      <div className="h-20 bg-black p-2 flex items-center">
        <Footer />
      </div>
    </div>
    // </body>
    // </html>

  );
}
