import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";



export const metadata: Metadata = {
  title: "Next App",
  description: "Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
      <Providers>
          <TopNav/>
          <main className='container mx-auto p-10'>
              {children}
          </main>
      </Providers>

      </body>
    </html>
  );
}
