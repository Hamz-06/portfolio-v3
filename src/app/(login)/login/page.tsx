'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// TODO: style this page
export default function EnterPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/portfolio')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className='bg-blue-400 flex items-center justify-center w-screen h-screen'>
      <form onSubmit={submit} className="p-6 max-w-md mx-auto mt-20">
        <h1 className="text-xl font-bold mb-4">Enter Password</h1>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Password"
        />
        <Button type="submit" className="bg-black text-white px-4 py-2">Enter</Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  )
}
