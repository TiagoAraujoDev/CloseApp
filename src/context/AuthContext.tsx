import { authToken } from '@/lib/axios/requests/authentication'
import { createContext, ReactNode, useState } from 'react'

interface AuthContextType {
  requestToken: string | undefined
  getRequestToken: () => Promise<void>
  createSessionId: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [requestToken, setRequestToken] = useState<string>()

  const getRequestToken = async () => {
    const response = await authToken()
    const token = response?.data.request_token
    setRequestToken(token)
  }

  const createSessionId = async () => {
    //  TODO: make a request to https://api.themoviedb.org/3/authentication/session/new?api_key=<<api_key>>
    //  NOTE: Send { request_token: "" } in the body
  }

  return (
    <AuthContext.Provider
      value={{ requestToken, getRequestToken, createSessionId }}
    >
      {children}
    </AuthContext.Provider>
  )
}
