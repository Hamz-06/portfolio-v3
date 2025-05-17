type MainLayoutProps = {
  children: React.ReactNode
}
export default function MainLayout({
  children
}: MainLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}