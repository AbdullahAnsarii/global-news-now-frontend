import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { BASE_URL_SERVER } from '@/common';
import { Category } from '@/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Global News Now',
  description: 'Global News Now Description',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerLinks: Category[] = await (await
    fetch(BASE_URL_SERVER
        + "category/find-by-filters?"
        + new URLSearchParams({
            sortByField: "createdAt",
        }), {
        method: "GET",
    })).json()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header headerLinks={headerLinks} />
        {children}
        <Footer headerLinks={headerLinks} />
      </body>

    </html>
  )
}
