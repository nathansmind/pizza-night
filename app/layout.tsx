import type { Metadata } from 'next'
import { PT_Sans, PT_Sans_Narrow } from 'next/font/google'
import './globals.css'

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
})

const ptSansNarrow = PT_Sans_Narrow({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-pt-sans-narrow',
})

export const metadata: Metadata = {
  title: 'Pizza Night',
  description: 'Pizza dough calculator with toppings and sauce recipes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ptSans.variable} ${ptSansNarrow.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
