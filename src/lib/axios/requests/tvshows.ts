import { AxiosError, AxiosResponse } from "axios";

import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getTvShows = async (
  label: string,
  pageParam: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(
      `tv/${label}?api_key=${apiKey}&page=${pageParam}`,
    );

    return response;
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getTvShowsDetails = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`tv/${id}?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getTvShowCredits = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`tv/${id}/credits?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getTvShowExternalIds = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`tv/${id}/external_ids?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

export const getTvShowReviews = async (
  id: number,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(`tv/${id}/reviews?api_key=${apiKey}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};
