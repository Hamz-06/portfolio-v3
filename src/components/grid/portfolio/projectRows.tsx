'use client'
import ToolTip from "@/components/tooltip/tooltip"
import { Button } from "@/components/ui/button"
import { capitalizeFirstLetter, cn, underscoreToSpace } from "@/lib/utils"
import { setSelectedCategory, useSelectedCategory } from "@/redux/slice/projectDataSlice"
import { ProjectTypes } from "@/sanity/schema/schema-types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

type ProjectRowsProps = {
  title: string
  children: React.ReactNode
}
//TODO: move this to sanity load dynamically
const TITLE_TAG_LINE: Record<ProjectTypes, string> = {
  blogs: 'Throw back',
  projects: 'Made for you',
  work_experience: 'Chart topper',
  education: 'Learn with me',
}
const titleTagLine = (title: ProjectTypes) => {
  return TITLE_TAG_LINE[title] || 'Welcome to my portfolio'
}

type OnClickDirection = 'left' | 'right'

function ProjectRows({
  title,
  children,
}: ProjectRowsProps) {
  const selectedCategory = useSelectedCategory()
  const dispatch = useDispatch();
  const tagline = titleTagLine(title as ProjectTypes)
  const rowContainer = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const updateProjects = (title: ProjectTypes) => {
    if (selectedCategory === title) {
      dispatch(setSelectedCategory(null))
      return
    }
    dispatch(setSelectedCategory(title))
  }


  const onClick = (direction: OnClickDirection) => {
    // rowContainer.current?.scrollBy({ left: -100 })
    if (direction === 'left') {
      rowContainer.current?.scrollBy({ left: -400, behavior: 'smooth' });
    } else {
      rowContainer.current?.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }
  useEffect(() => {
    console.log('canScrollRight', canScrollRight)
  }, [canScrollRight])

  useEffect(() => {
    const el = rowContainer.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollWidth > el.clientWidth && el.scrollLeft < el.scrollWidth - el.clientWidth);
    };

    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="mb-8 w-full mt-10 overflow-auto p-0 sm:pl-7 relative">
      <div className="mb-2 flex items-center justify-between">
        <div className="pl-3">
          <h6 className="font-light text-xs text-zinc-400">{tagline}</h6>
          <h2 className="text-2xl font-bold">{underscoreToSpace(capitalizeFirstLetter(title))}</h2>
        </div>
        <Button
          onClick={() => updateProjects(title as ProjectTypes)}
          className="text-sm text-zinc-400 hover:underline font-bold">
          Show All
        </Button>
      </div>


      {/* render the children in a grid layout if category is selected */}
      {/* todo not centred on mobile  */}
      <div
        ref={rowContainer}
        className={cn(
          'scrollable-content',
          selectedCategory
            ? "flex flex-wrap gap-3 px-4 sm:px-0"
            : "grid grid-flow-col auto-cols-max gap-4 overflow-x-auto"
        )}
      >
        {children}
      </div>
      <div className="hidden sm:block">
        <ToolTip tooltipContent="Scroll Left">
          <div
            onClick={() => onClick('left')}
            className={cn(canScrollLeft ? 'block' : 'hidden',
              "absolute bg-zinc-600 left-0 top-1/2 -translate-y-1/2 p-1 group rounded-full hover:cursor-pointer")}>
            <ChevronLeft className="stroke-zinc-400 group-hover:stroke-white" />
          </div>
        </ToolTip>

        <ToolTip tooltipContent="Scroll Right">
          <div
            onClick={() => onClick('right')}
            className={cn(
              canScrollRight ? 'block' : 'hidden',
              "absolute bg-zinc-600 right-0 top-1/2 -translate-y-1/2 p-1 rounded-full mr-2 group hover:cursor-pointer")}>
            <ChevronRight className="stroke-zinc-400 group-hover:stroke-white" />
          </div>
        </ToolTip>
      </div>
    </section>
  )
}
export { ProjectRows }