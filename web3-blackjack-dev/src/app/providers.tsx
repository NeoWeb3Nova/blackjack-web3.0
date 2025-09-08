"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";
import { getConfig } from "@/wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Create a single QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={getConfig()} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
