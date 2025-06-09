import './globals.css'
import Navbar from '@/components/Navbar'
import HtmlWrapper from '@/components/HtmlWrapper'

export const metadata = {
  title: 'MyBlog',
  description: '使用 Tiptap 实现写作功能',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HtmlWrapper>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </HtmlWrapper>
  )
}
