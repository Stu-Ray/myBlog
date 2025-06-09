'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="w-full flex items-center justify-between px-6 py-3">
        {/* 左侧 Logo */}
        <Link href="/" className="text-xl font-bold text-blue-700">
          📝 MyBlog
        </Link>

        {/* 右侧导航链接 */}
        <div className="space-x-6 text-sm">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            编辑器
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600">
            博客列表
          </Link>
        </div>
      </div>
    </nav>
  )
}
