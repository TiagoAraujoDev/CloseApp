import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@/lib/axios/index'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export const authToken = async (): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`authentication/token/new?api_key=${apiKey}`)

    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error)
    }
  }
}

export const getSessionId = async (
  requestToken: string,
): Promise<AxiosResponse | undefined> => {
  try {
    const body = {
      request_token: requestToken,
    }
    const response = await api.post(
      `authentication/session/new?api_key=${apiKey}`,
      body,
    )

    return response
  } catch (error) {
    if (error instanceof AxiosError && error.status === 401) {
      console.log('error')
      console.log(error)
    }
  }
}

export const deleteSessionId = async (
  sessionId: string,
): Promise<AxiosResponse | undefined> => {
  try {
    const body = {
      session_id: sessionId,
    }
    const response = await api.delete(
      `authentication/session?api_key=${apiKey}`,
      { data: body },
    )

    return response
  } catch (error) {
    if (error instanceof AxiosError && error.status === 401) {
      console.log('error')
      console.log(error)
    }
  }
}
