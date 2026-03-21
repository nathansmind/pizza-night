import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pizza Calculator',
  description: 'Pizza dough calculator with toppings and sauce recipes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
