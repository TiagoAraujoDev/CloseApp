import { createContext, ReactNode, useEffect, useState } from 'react'

import {
  authToken,
  deleteSessionId,
  getSessionId,
} from '@/lib/axios/requests/authentication'

interface AuthContextType {
  sessionId: string | undefined
  getRequestToken: () => Promise<string>
  createSessionId: (requestToken: string) => Promise<void>
  logoutSession: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [sessionId, setSessionId] = useState<string>()
  useEffect(() => {
    const sessionIdFromStorage = localStorage.getItem('@close_app:session_id')

    console.log('SessionId localStorage: ', sessionIdFromStorage)
    if (sessionIdFromStorage && !sessionId) {
      setSessionId(sessionIdFromStorage)
    } else if (sessionIdFromStorage && sessionId) {
      localStorage.setItem('@close_app:session_id', sessionId)
    }
  }, [sessionId])

  const getRequestToken = async () => {
    const response = await authToken()
    const token = response?.data.request_token
    return token
  }

  const createSessionId = async (requestToken: string) => {
    if (requestToken) {
      const response = await getSessionId(requestToken)
      const sessionId = response?.data.session_id

      localStorage.setItem('@close_app:session_id', sessionId)
      setSessionId(sessionId)
    }
  }

  const logoutSession = async () => {
    if (sessionId) {
      const response = await deleteSessionId(sessionId)
      if (response?.data.success) {
        setSessionId('')
        localStorage.removeItem('@close_app:session_id')
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ getRequestToken, createSessionId, sessionId, logoutSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}
