import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@/lib/axios/index'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

interface AddToWatchListParams {
  mediaType: string
  mediaId: number | undefined
  sessionId: string | undefined
  isInWatchlist: boolean
}

interface SetAsFavoriteParams {
  sessionId: string | undefined
  mediaType: string
  mediaId: number | undefined
  isFavorite: boolean
}

interface RateMediaParams {
  sessionId: string | undefined
  mediaType: string
  mediaId: number | undefined
  rating: number
}

interface AccountStateParams {
  mediaId: number | undefined
  sessionId: string | undefined
  mediaType: string
}

export const addToWatchList = async ({
  sessionId,
  mediaType,
  mediaId,
  isInWatchlist,
}: AddToWatchListParams): Promise<void> => {
  try {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: isInWatchlist,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const accountId = await getAccountId(sessionId as string)

    await api.post(
      `account/${accountId}/watchlist?api_key=${apiKey}&session_id=${sessionId}`,
      body,
      config,
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('response error', error.response?.data)
    }
  }
}

export const setAsFavorite = async ({
  sessionId,
  mediaType,
  mediaId,
  isFavorite,
}: SetAsFavoriteParams) => {
  try {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: isFavorite,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const accountId = await getAccountId(sessionId as string)

    await api.post(
      `account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      body,
      config,
    )
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

    await api.post(
      `${mediaType}/${mediaId}/rating?api_key=${apiKey}&session_id=${sessionId}`,
      body,
      config,
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
  }
}

export const getAccountState = async ({
  mediaId,
  sessionId,
  mediaType,
}: AccountStateParams): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(
      `${mediaType}/${mediaId}/account_states?api_key=${apiKey}&session_id=${sessionId}`,
    )

    return response
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
