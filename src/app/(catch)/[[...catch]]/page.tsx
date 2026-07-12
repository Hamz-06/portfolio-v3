import { HOME_PAGE_ROUTE } from '@/constants/pageRoutes'
import { redirect } from 'next/navigation'

function Page() {
  return redirect(HOME_PAGE_ROUTE)
}

export default Page