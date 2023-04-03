import { createContext, ReactNode, useEffect, useState } from 'react'

import { authToken, getSessionId } from '@/lib/axios/requests/authentication'

interface AuthContextType {
  sessionId: string | undefined
  getRequestToken: () => Promise<string>
  createSessionId: (requestToken: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [sessionId, setSessionId] = useState<string>()

  useEffect(() => {
    const sessionIdFromStorage = localStorage.getItem('@close_app:session_id')

    console.log(sessionIdFromStorage)
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

  return (
    <AuthContext.Provider
      value={{ getRequestToken, createSessionId, sessionId }}
    >
      {children}
    </AuthContext.Provider>
  )
}
