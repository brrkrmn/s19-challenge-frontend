"use client"

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ToastProvider />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default ThemeProvider;