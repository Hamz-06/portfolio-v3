'use client';

import ToolTip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter, cn, underscoreToSpace } from '@/lib/utils';
import { ProjectTypes } from '@/sanity/schema/schema-types';
import { useCategoryStore } from '@/store/categoryStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ProjectRowsProps = {
  title: string;
  children: React.ReactNode;
};

// TODO: Move to Sanity and load dynamically
const TITLE_TAG_LINES: Record<ProjectTypes, string> = {
  blogs: 'Throw back',
  projects: 'Made for you',
  work_experience: 'Chart topper',
  education: 'Learn with me',
};

const SCROLL_DISTANCE = 400;
const SCROLL_BEHAVIOR = 'smooth' as const;
const SCROLL_BUTTON_CLASS = 'absolute bg-zinc-600 top-1/2 -translate-y-1/2 p-1 rounded-full group hover:cursor-pointer';
const DEFAULT_TAGLINE = 'Welcome to my portfolio';

function ProjectRows({ title, children }: ProjectRowsProps) {
  const { selectedCategory, setCategoryType } = useCategoryStore();
  const tagline = TITLE_TAG_LINES[title as ProjectTypes] ?? DEFAULT_TAGLINE;
  const rowContainer = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const handleCategoryToggle = () => {
    if (selectedCategory === title) {
      setCategoryType('all');
      return;
    }
    setCategoryType(title as ProjectTypes);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const scrollDistance = direction === 'left' ? -SCROLL_DISTANCE : SCROLL_DISTANCE;
    rowContainer.current?.scrollBy({ left: scrollDistance, behavior: SCROLL_BEHAVIOR });
  };

  useEffect(() => {
    const el = rowContainer.current;
    if (!el) return;

    const updateScrollState = () => {
      const isAtStart = el.scrollLeft === 0;
      const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth;

      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    };

    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
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
          onClick={handleCategoryToggle}
          className="text-sm text-zinc-400 hover:underline font-bold"
        >
          Show All
        </Button>
      </div>

      <div
        ref={rowContainer}
        className={cn(
          'scrollable-content',
          selectedCategory
            ? 'flex flex-wrap gap-3 px-4 sm:px-0'
            : 'grid grid-flow-col auto-cols-max gap-4 overflow-x-auto'
        )}
      >
        {children}
      </div>

      <div className="hidden sm:block">
        <ToolTip tooltipContent="Scroll Left">
          <button
            onClick={() => handleScroll('left')}
            className={cn(SCROLL_BUTTON_CLASS, 'left-0', canScrollLeft ? 'block' : 'hidden')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="stroke-zinc-400 group-hover:stroke-white" />
          </button>
        </ToolTip>

        <ToolTip tooltipContent="Scroll Right">
          <button
            onClick={() => handleScroll('right')}
            className={cn(SCROLL_BUTTON_CLASS, 'right-0 mr-2', canScrollRight ? 'block' : 'hidden')}
            aria-label="Scroll right"
          >
            <ChevronRight className="stroke-zinc-400 group-hover:stroke-white" />
          </button>
        </ToolTip>
      </div>
    </section>
  );
}

export { ProjectRows };