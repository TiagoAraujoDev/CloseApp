"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { queryClient } from "@/lib/ReactQuery";
import { TrendingProvider } from "@/context/TrendingContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrendingProvider>{children}</TrendingProvider>
    </QueryClientProvider>
  );
}
