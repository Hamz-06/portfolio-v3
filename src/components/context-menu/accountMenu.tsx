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
import { useProfile } from '@/redux/slice/profileSlice';

type AccountMenuBarProps = {
  children: React.ReactNode
}
export function AccountMenuBar({ children }: AccountMenuBarProps) {
  const profile = useProfile()

  // todo: create new endpoint to get the latest commit version
  // const latestVersion = 'https://github.com/Hamz-06/portfoliov3/commit/a1b2c3d4e5f67890abcdef1234567890abcdef12' 
  const email = profile?.email_address ?? ''
  const githubLink = profile?.github_link ?? ''
  const linkedInLink = profile?.linkedin_link ?? ''
  const projectVersions = profile?.project_versions ?? []


  const copyToClipboard = (text: string) => {
    copy(text);
  }
  return (
    <Menubar className="bg-none border-none rounded-md shadow-lg">
      <MenubarMenu>
        <MenubarTrigger asChild>{children}</MenubarTrigger>

        <MenubarContent >
          <ToolTip tooltipContent='Latest Commit' tooltipSide='left'>
            <MenubarItem disabled className='hover:bg-transparent cursor-default'>
              <span
                // onClick={() => window.open(latestVersion, '_blank')} //todo yet to implement
                className='hover:underline cursor-pointer italic'>
                v:{"a1b2c3d4e5f67890abcdef1234567890abcdef12".slice(0, 15)}
              </span>
            </MenubarItem>
          </ToolTip>

          <MenubarSeparator className='border-t border-zinc-700 my-1' />

          <MenubarItem
            onClick={() => window.open(githubLink, '_blank')}>
            My Github
            <MenubarShortcut><ExternalLink className="h-4 w-4 text-white" /></MenubarShortcut>
          </MenubarItem>

          <ToolTip tooltipContent={email} tooltipSide='left'>
            <MenubarItem
              onClick={() => copyToClipboard(email)}>
              My Email
              <MenubarShortcut><Copy className="h-4 w-4 text-white" /></MenubarShortcut>
            </MenubarItem>
          </ToolTip>

          <MenubarItem
            onClick={() => window.open(linkedInLink, '_blank')}>
            LinkedIn
            <MenubarShortcut><ExternalLink className="h-4 w-4 text-white" /></MenubarShortcut>
          </MenubarItem>

          <MenubarSub>
            <MenubarSubTrigger >
              Project Versions
            </MenubarSubTrigger>
            <MenubarSubContent className='bg-zinc-800'>
              {
                projectVersions.map((version, index) => {
                  const { version_number, version_url } = version
                  return (
                    <MenubarItem
                      key={index}
                      onClick={() => window.open(version_url, '_blank')}>
                      {version_number}
                    </MenubarItem>
                  )
                })
              }
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
