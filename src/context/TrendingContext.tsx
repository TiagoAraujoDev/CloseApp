"use client";

import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";

import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface TrendingProviderProps {
  children: ReactNode;
}

export interface MovieType {
  id: number;
  original_title: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
}

export interface TVType {
  id: number;
  original_name: string;
  first_air_date: string;
  backdrop_path: string;
  poster_path: string;
}

interface TrendingContextType {
  getTrending: (
    type: string,
    period: string,
  ) => Promise<AxiosResponse | undefined>;
}

export const TrendingContext = createContext({} as TrendingContextType);

export function TrendingProvider({ children }: TrendingProviderProps) {
  console.log("Context render");
  const getTrending = async (
    type: string,
    period: string,
  ): Promise<AxiosResponse | undefined> => {
    try {
      const response = await api.get(
        `trending/${type}/${period}?api_key=${apiKey}`,
      );
      return response;
    } catch (error: any) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.log("Status: ", error.response.status);
        console.log("Info: ", error.response.data);
      }
    }
  };

  return (
    <TrendingContext.Provider value={{ getTrending }}>
      {children}
    </TrendingContext.Provider>
  );
}
