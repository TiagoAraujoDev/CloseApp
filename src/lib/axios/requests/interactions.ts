import { AxiosError } from 'axios'

import { api } from '@/lib/axios/index'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

interface AddToWatchListParams {
  mediaType: string
  id: number | undefined
  sessionId: string | undefined
}

interface SetAsFavoriteParams {
  sessionId: string | undefined
  mediaType: string
  id: number | undefined
}

interface RateMediaParams {
  sessionId: string | undefined
  mediaType: string
  mediaId: number | undefined
  rating: number
}

export const addToWatchList = async (
  params: AddToWatchListParams,
): Promise<void> => {
  try {
    const body = {
      media_type: params.mediaType,
      media_id: params.id,
      watchlist: true,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const accountId = await getAccountId(params.sessionId as string)

    const response = await api.post(
      `account/${accountId}/watchlist?api_key=${apiKey}&session_id=${params.sessionId}`,
      body,
      config,
    )

    console.log('response', response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('response error', error.response?.data)
    }
  }
}

export const setAsFavorite = async ({
  sessionId,
  mediaType,
  id,
}: SetAsFavoriteParams) => {
  try {
    const body = {
      media_type: mediaType,
      media_id: id,
      favorite: true,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const accountId = await getAccountId(sessionId as string)

    const response = await api.post(
      `account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      body,
      config,
    )

    console.log(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
  }
}

export const rateMedia = async ({
  sessionId,
  mediaType,
  mediaId,
  rating,
}: RateMediaParams) => {
  try {
    const body = {
      value: rating * 2,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await api.post(
      `${mediaType}/${mediaId}/rating?api_key=${apiKey}&session_id=${sessionId}`,
      body,
      config,
    )

    console.log(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
  }
}
const getAccountId = async (sessionId: string) => {
  const response = await api.get(
    `account?api_key=${apiKey}&session_id=${sessionId}`,
  )

  return response.data.id
}
