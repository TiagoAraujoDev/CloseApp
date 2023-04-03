import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@/lib/axios'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export const getTrending = async (
  variant: string,
  period: string,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(
      `trending/${variant}/${period}?api_key=${apiKey}`,
    )
    return response
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log('Status: ', error.response.status)
      console.log('Info: ', error.response.data)
    }
  }
}
