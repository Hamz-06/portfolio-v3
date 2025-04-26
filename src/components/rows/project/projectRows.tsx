import Link from "next/link"

function ProjectRows({
  title,
  seeAllHref = "#",
  children,
}: {
  title: string
  seeAllHref?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={seeAllHref} className="text-sm font-medium text-zinc-400 hover:underline">
          See all
        </Link>
      </div>
      {children}
    </section>
  )
}
export { ProjectRows }