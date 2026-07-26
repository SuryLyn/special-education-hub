import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Special Education Evidence-Based Intervention Hub',
  description: '特殊教育实证干预知识库 - 为特殊儿童家长和教育工作者提供国际权威干预方法',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
