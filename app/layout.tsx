import type { Metadata, Viewport } from 'next'
import { Gloock } from 'next/font/google'

import './globals.css'
import { PostcardSprites } from '@/components/postcard/sprites'
import { Toaster } from '@/components/ui/sonner'

const gloock = Gloock({ weight: '400', subsets: ['latin'], variable: '--font-gloock' })

export const metadata: Metadata = {
  title: '붉은 양의 연하장',
  description: '2027 붉은 양의 해, 세린에게 새해 덕담을 엽서로 보내 주세요.',
}

export const viewport: Viewport = { themeColor: '#1d1816' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${gloock.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full">
        <PostcardSprites />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
