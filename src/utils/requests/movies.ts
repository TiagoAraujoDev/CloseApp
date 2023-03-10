import { AxiosError } from "axios";

import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getMovies = async (label: string) => {
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

export const getMovieDetails = async (id: number) => {
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

export const getConfig = async () => {
  try {
    const response = await api.get(`configuration?api_key=${apiKey}`);

    return response;
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};
