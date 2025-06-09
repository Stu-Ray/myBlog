export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">你访问的页面不存在或已被删除。</p>
      <a
        href="/blog"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm"
      >
        返回博客首页
      </a>
    </main>
  )
}
