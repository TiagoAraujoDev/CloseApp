'use client'

import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CiLogin } from 'react-icons/ci'

export const LogginButton = () => {
  const { getRequestToken, sessionId } = useContext(AuthContext)
  const router = useRouter()

  const handleLoggin = async () => {
    const token = await getRequestToken()
    //  FIX: Change the redirect_to url for production domain
    router.push(
      `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://www.localhost:3000/approved`,
    )
  }

  return (
    <button
      className="disabled:cursor-not-allowed"
      disabled={!!sessionId}
      onClick={handleLoggin}
    >
      <CiLogin title="Loggin" className="text-2xl text-emerald-500" />
    </button>
  )
}
