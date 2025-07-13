//todo: Not used, prob remove this file later
'use client'

import { GithubIcon, LinkedInIcon } from "@/components/layout/customIcons";
import { useSelectedCategory } from "@/redux/slice/projectDataSlice";
import { setPageColorTint } from "@/redux/slice/styleSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

type Item = {
  label: string;
  link: string;
  icon: React.ReactNode;
  backgroundColor: string;
};

const items: Item[] = [
  { label: "Github", link: "https://github.com", icon: <GithubIcon />, backgroundColor: 'violet' },
  { label: "LinkedIn", link: "https://www.linkedin.com", icon: <LinkedInIcon />, backgroundColor: 'blue' },
  { label: "Contact", link: "https://www.linkedin.com", icon: <LinkedInIcon />, backgroundColor: '#FFB6C1' },
  { label: "Spotify Wrapped", link: "https://www.linkedin.com", icon: <LinkedInIcon />, backgroundColor: '#FF10F0' },
];

function SocialMediaList() {
  const selectedCategory = useSelectedCategory();
  const dispatch = useDispatch()

  const handleMouseEnter = (color: string) => {
    dispatch(setPageColorTint(color))
  };

  return (
    !selectedCategory && (
      <div className="mb-8 px-2 sm:px-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map(({ label, link, icon, backgroundColor }, idx) => (
            <Link key={idx} href={link}>
              <div
                onMouseEnter={() => handleMouseEnter(backgroundColor)}
                className="h-12 flex items-center gap-3 bg-gray-400/30 hover:bg-zinc-700/50 rounded-md p-2 pl-0 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 p-3 rounded flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <span className="font-medium text-white text-sm truncate">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}

export { SocialMediaList };
