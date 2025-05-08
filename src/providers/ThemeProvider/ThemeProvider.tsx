"use client"

import { HeroUIProvider, ToastProvider } from '@heroui/react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>
    <ToastProvider />
    {children}
  </HeroUIProvider>;
};

export default ThemeProvider;
