'use client'

interface HtmlWrapperProps {
  children: React.ReactNode
}

export default function HtmlWrapper({ children }: HtmlWrapperProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
