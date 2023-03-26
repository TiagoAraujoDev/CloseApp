import { AxiosError, AxiosResponse } from "axios";

import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getMovies = async (
  label: string,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`movie/${label}?api_key=${apiKey}`);

    return response;
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getMovieDetails = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`movie/${id}?api_key=${apiKey}`);

    return response;
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getMovieCredits = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`movie/${id}/credits?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getMovieReviews = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`movie/${id}/reviews?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getMovieExternalIds = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(
      `movie/${id}/external_ids?api_key=${apiKey}`,
    );

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};
