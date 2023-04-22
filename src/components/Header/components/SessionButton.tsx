'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { CiLogin, CiLogout } from 'react-icons/ci'

import { AuthContext } from '@/context/AuthContext'

export const SessionButton = () => {
  const { getRequestToken, sessionId, logoutSession } = useContext(AuthContext)
  const router = useRouter()

  const handleLoggin = async () => {
    const token = await getRequestToken()
    //  FIX: Change the redirect_to url for production domain
    router.push(
      //  NOTE: url for production 👇
      `https://www.themoviedb.org/authenticate/${token}?redirect_to=https://close-app.vercel.app/approved`,

      //  NOTE: url for development 👇
      // `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/approved`,
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
