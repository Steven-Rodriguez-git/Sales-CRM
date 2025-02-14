"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin-ext", "latin"],
  weight: ["400", "500", "700"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body
          style={{
            fontFamily: "var(--font-roboto)",
            backgroundColor: "#f6faff",
          }}
          className={`${roboto.variable}`}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
