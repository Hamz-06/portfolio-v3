'use client'
import { useShuffleStore } from "@/zustand/shuffle"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { setTogglePlay } from "@/zustand/togglePlay"


type ProviderProps = {
  shuffleActive: boolean;
  children: React.ReactNode,
}

export const PORTFOLIO_DETAIL_REGEX = /^\/portfolio\/(projects|work_experience|blogs|education)\/[^/]+$/;


export function RootLayoutProvider({ children, shuffleActive }: ProviderProps) {
  const pathname = usePathname()
  const setShuffle = useShuffleStore((state) => state.setShuffle)

  useEffect(() => {
    const isDetailPage = PORTFOLIO_DETAIL_REGEX.test(pathname);
    setTogglePlay(isDetailPage)

    setShuffle(shuffleActive)
  }, [pathname, shuffleActive, setShuffle])

  return <>{children}</>
}