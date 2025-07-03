'use client'
import React from 'react'
import ToolTip from '../tooltip/tooltip'
import { Button } from '../ui/button'
import { House } from 'lucide-react'
import { Routes } from '@/types/routes';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const HOME_PAGE_ROUTE: Routes = '/portfolio';

function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === HOME_PAGE_ROUTE;

  const redirectToHome = () => {
    if (isHomePage) return;
    router.push(HOME_PAGE_ROUTE);
  }

  return (
    <ToolTip tooltipContent='Home'>
      <Button
        onClick={redirectToHome}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 mr-2 text-zinc-400 hover:text-white"
      >
        <House className={cn(isHomePage ? 'stroke-white' : 'stroke-zinc-400')}
          style={{ width: '22px', height: '22px' }} />
      </Button>
    </ToolTip>
  )
}

export { HomeButton }