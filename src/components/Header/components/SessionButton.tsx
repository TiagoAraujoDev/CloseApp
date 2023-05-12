'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { CiLogin, CiLogout } from 'react-icons/ci'

import { AuthContext } from '@/context/AuthContext'

export const SessionButton = () => {
  const { getRequestToken, sessionId, logoutSession } = useContext(AuthContext)
  const router = useRouter()

  const redirectUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://close-app.vercel.app/approved'
      : 'http://localhost:3000/approved'

  const handleLoggin = async () => {
    const token = await getRequestToken()
    router.push(
      `https://www.themoviedb.org/authenticate/${token}?redirect_to=${redirectUrl}`,
    )
  }

  const handleLogout = async () => {
    logoutSession()
    router.push('/')
  }

  return (
    <>
      {sessionId ? (
        <button className="disabled:cursor-not-allowed" onClick={handleLogout}>
          <CiLogout title="Logout" className="text-2xl text-emerald-500" />
        </button>
      ) : (
        <button className="disabled:cursor-not-allowed" onClick={handleLoggin}>
          <CiLogin title="Loggin" className="text-2xl text-emerald-500" />
        </button>
      )}
    </>
  )
}
