import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/theme.css";
import AppWrapper from "@/layout/mainLayout";
import { SessionProvider } from "@/context";
import { ToggleStateProvider } from "@/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WMM",
  description: "Warehouse Machine Manager",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-0 m-0`}>
        <ToggleStateProvider>
          <SessionProvider>
            <AppWrapper>
              {children}
            </AppWrapper>
          </SessionProvider>
        </ToggleStateProvider>
      </body>
    </html>
  );
}
