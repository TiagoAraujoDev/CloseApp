import { AxiosError, AxiosResponse } from "axios";

import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const search = async (
  query: string | null,
  mediaType: string,
  page: number = 1,
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.get(
      `search/${mediaType}?api_key=${apiKey}&query=${query}&page=${page}`,
    );

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Status: ", error.response.status);
      console.log("Info: ", error.response.data);
    }
  }
};

//  NOTE: Used only for development propose
//        Image size array, url and other stuff
export const getConfig = async (): Promise<AxiosResponse | undefined> => {
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
