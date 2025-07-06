'use client'
import copy from 'copy-to-clipboard';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Copy, ExternalLink } from "lucide-react"
import ToolTip from '../tooltip/tooltip';

type AccountMenuBarProps = {
  children: React.ReactNode
}
export function AccountMenuBar({ children }: AccountMenuBarProps) {
  const newUrl = 'https://google.com/version2'
  const email = 'hamzah1010@hotmail.co.uk'
  const github = 'https://github.com/Hamz-06'
  const latestVersion = 'https://github.com/Hamz-06/portfoliov3'

  const copyToClipboard = (text: string) => {
    copy(text);
  }
  return (
    <Menubar className="bg-none border-none rounded-md shadow-lg">
      <MenubarMenu>
        <MenubarTrigger asChild>{children}</MenubarTrigger>

        <MenubarContent >
          <ToolTip tooltipContent='Latest Commit' tooltipSide='left'>
            <MenubarItem className='hover:bg-transparent cursor-default'>
              <span
                onClick={() => window.open(latestVersion, '_blank')}
                className='hover:underline cursor-pointer italic'>
                v:{"a1b2c3d4e5f67890abcdef1234567890abcdef12".slice(0, 15)}
              </span>
            </MenubarItem>
          </ToolTip>

          <MenubarSeparator className='border-t border-zinc-700 my-1' />

          <ToolTip tooltipContent={github} tooltipSide='left'>
            <MenubarItem
              onClick={() => window.open(newUrl, '_blank')}>
              Github<MenubarShortcut><ExternalLink className="h-4 w-4 text-white" /></MenubarShortcut>
            </MenubarItem>
          </ToolTip>

          <ToolTip tooltipContent={email} tooltipSide='left'>
            <MenubarItem
              onClick={() => copyToClipboard(email)}>
              My Email <MenubarShortcut><Copy className="h-4 w-4 text-white" /></MenubarShortcut>
            </MenubarItem>
          </ToolTip>

          <MenubarSub>
            <MenubarSubTrigger >
              Project Versions
            </MenubarSubTrigger>
            <MenubarSubContent className='bg-zinc-800'>
              <MenubarItem
                onClick={() => window.open(newUrl, '_blank')}>
                version 2
              </MenubarItem>
              <MenubarItem
                onClick={() => window.open(newUrl, '_blank')}>
                version 1
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
