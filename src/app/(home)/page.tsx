import { ProjectCard } from "@/components/cards/project-cards/projectCards";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

// Sample data
export type ProjectCardType = {
  id: number;
  title: string,
  subtitle: string,
  imageUrl: string,
  type: 'projects' | 'certificates' | 'blogs' | 'work-experience',
  href?: string,
}
const recentlyPlayed: ProjectCardType[] = [
  {
    id: 1,
    title: "Chill Lo-fi Mix",
    subtitle: "Perfect for studying and relaxation",
    imageUrl: "/placeholder.svg?height=300&width=300",
    type: "projects",
    href: "/projects/chill-lofi-mix",
  },
  {
    id: 2,
    title: "Midnight City",
    subtitle: "M83",
    imageUrl: "/placeholder.svg?height=300&width=300",
    type: "projects",
    href: "/projects/midnight-city",
  },
]

const blogs: ProjectCardType[] = [
  {
    id: 1,
    title: "Future Nostalgia",
    subtitle: "Dua Lipa",
    imageUrl: "/placeholder.svg?height=300&width=300",
    type: "blogs",
    href: "/blogs/future-nostalgia",
  },
  {
    id: 2,
    title: "After Hours",
    subtitle: "The Weeknd",
    imageUrl: "/placeholder.svg?height=300&width=300",
    type: "blogs",
    href: "/blogs/after-hours",
  },
]


export default function Home() {
  return (
    <>
      <ScrollArea className="px-6 py-6 w-full h-full overflow-auto">
        <MusicCardRow title="Recently Played" seeAllHref="/recently-played">
          <MusicCardGrid>
            {recentlyPlayed.map((item) => (
              <ProjectCard
                key={item.id}
                cardDetails={item}
              />
            ))}
          </MusicCardGrid>
        </MusicCardRow>

        <MusicCardRow title="New Releases" seeAllHref="/new-releases">
          <MusicCardGrid>
            {blogs.map((item) => (
              <ProjectCard
                key={item.id}
                cardDetails={item}
              />
            ))}
          </MusicCardGrid>
        </MusicCardRow>

      </ScrollArea>
    </>

  );
}


function MusicCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {children}
    </div>
  )
}

function MusicCardRow({
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


