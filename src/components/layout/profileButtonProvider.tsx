
import { ProfileModel } from '@/models/profileModel';
import React from 'react'
import { AccountMenuBar } from '../context-menu/accountMenu';
import { Button } from '../ui/button';
import { sleep } from '@/lib/utils';


async function ProfileButtonProvider() {
  const userProfile = await new ProfileModel().getProfile();

  await sleep(10_000)
  if (!userProfile) {
    return null;
  }
  return (
    <AccountMenuBar userProfile={userProfile}>
      <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-black font-bold">
        H
      </Button>
    </AccountMenuBar>
  )
}

export { ProfileButtonProvider }