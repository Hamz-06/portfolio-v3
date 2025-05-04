type MainLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}
export default function MainLayout({
  children, modal
}: MainLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          {modal}
        </main>
      </body>
    </html>
  )
}