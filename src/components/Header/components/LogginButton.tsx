'use client'

import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { CiLogin } from 'react-icons/ci'

//  WARNING: Remove requestToken! instead use sessionId
export const LogginButton = () => {
  const { getRequestToken, requestToken } = useContext(AuthContext)

  const handleLoggin = () => {
    getRequestToken()
  }

  return (
    <button
      className="disabled:cursor-not-allowed"
      disabled={!!requestToken}
      onClick={handleLoggin}
    >
      <CiLogin title="Loggin" className="text-2xl text-emerald-500" />
    </button>
  )
}
