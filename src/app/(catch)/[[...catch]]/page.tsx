import { Routes } from '@/types/routes'
// import { redirect } from 'next/navigation'

const HOME_PAGE: Routes = '/portfolio'

function Page() {
  // return redirect(HOME_PAGE)
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
      <a href={HOME_PAGE} className="mt-4 text-blue-500 hover:underline">Go to Home Page</a>
    </div>
  )
}

export default Page