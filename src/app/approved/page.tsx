'use client'

import { useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { AuthContext } from '@/context/AuthContext'

export default function SessionApprovedPage() {
  const { createSessionId } = useContext(AuthContext)
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('request_token')

  const handleLogginInSession = async (token: string | null) => {
    if (token) await createSessionId(token)
    router.push('/')
  }

  return (
    <section className="max-w-5xl myMinHeight flex items-center justify-center m-auto my-8 px-4">
      <div className="flex flex-col justify-between gap-6 items-center">
        <h1 className="text-4xl text-emerald-500 font-bold text-center">
          Loggin Approved
        </h1>
        <button
          className="text-2xl text-neutral-50 hover:shadow-lg hover:shadow-green-800 hover:bg-emerald-500 border border-emerald-500 rounded p-3 transition-all"
          onClick={() => handleLogginInSession(token)}
        >
          Start navigation
        </button>
      </div>
    </section>
  )
}
