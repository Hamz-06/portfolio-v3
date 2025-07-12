import { Routes } from '@/types/routes'
import { redirect } from 'next/navigation'

const HOME_PAGE: Routes = '/portfolio'

function Page() {
  return redirect(HOME_PAGE)
}

export default Page