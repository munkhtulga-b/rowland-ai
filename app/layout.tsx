import React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "./_provider/AppProvider";

const fontFamily = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "Rowland AI",
  description: "Rowland AI",
  robots: {
    index: process.env.APP_ENV === "prod" ? true : false, // Disables indexing in search engines (made it dynamic for future use)
    follow: process.env.APP_ENV === "prod" ? true : false,
    googleBot: {
      index: process.env.APP_ENV === "prod" ? true : false,
      follow: process.env.APP_ENV === "prod" ? true : false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <AntdRegistry>
          <AppProvider fontFamily={fontFamily}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
