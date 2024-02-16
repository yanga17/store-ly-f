import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

import "../styles/theme.css";
import AppWrapper from "@/layout/mainLayout";
import { SessionProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attend Track",
  description: "Track in-house training attendance",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${inter.className} p-0 m-0`}>
          <AppWrapper>
            {children}
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
          </AppWrapper>
        </body>
      </SessionProvider>
    </html>
  );
}
