import { api } from '@/lib/axios/index'
import { AxiosError, AxiosResponse } from 'axios'

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
