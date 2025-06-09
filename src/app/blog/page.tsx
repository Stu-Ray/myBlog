'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Skeleton } from '@/components/Skeleton'
import PostListSkeleton from '@/components/PostListSkeleton'

dayjs.extend(relativeTime)

interface Post {
  title: string
  slug: string
  content: string
  tags?: string[]
  coverUrl?: string
  createdAt: string
  updatedAt: string
}

function highlight(text: string, keyword: string): string {
  if (!keyword.trim()) return text
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escaped, 'gi')
  return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`)
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState<'title' | 'content'>('title')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const POSTS_PER_PAGE = 5

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/list-post')
        const data = await res.json()
        const sorted = data.sort((a: Post, b: Post) => b.updatedAt.localeCompare(a.updatedAt))
        setPosts(sorted)
      } catch (error) {
        console.error('Failed to fetch posts', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredPosts = posts.filter(post => {
    const keyword = search.toLowerCase()
    const matchesSearch =
      searchType === 'title'
        ? post.title.toLowerCase().includes(keyword)
        : post.content.toLowerCase().includes(keyword)

    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const pagePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])))

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">📚 我的博客</h1>

      {/* 搜索栏 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          placeholder="请输入关键词..."
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded"
        />
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value as 'title' | 'content')
            setCurrentPage(1)
          }}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded"
        >
          <option value="title">按标题搜索</option>
          <option value="content">按内容搜索</option>
        </select>
      </div>

      {/* 标签筛选 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 border rounded ${!selectedTag ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
        >
          全部标签
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTag(tag)
              setCurrentPage(1)
            }}
            className={`px-3 py-1 border rounded ${
              selectedTag === tag ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      {isLoading ? (
        <PostListSkeleton />
      ) : (
        <ul className="space-y-6">
          {pagePosts.map(post => (
            <li key={post.slug} className="bg-white p-4 rounded shadow border hover:shadow-md transition">
              {/* {post.coverUrl && (
                <img
                  src={post.coverUrl}
                  className="w-full h-48 object-cover rounded mb-3"
                  alt="封面图"
                />
              )} */}
              <h2 className="text-xl font-semibold mb-1">
                <Link href={`/blog/${post.slug}`}>
                  <span dangerouslySetInnerHTML={{ __html: highlight(post.title, searchType === 'title' ? search : '') }} />
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-2">🕒 更新于 {dayjs(post.updatedAt).fromNow()}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {post.tags?.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 分页控件 */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? 'bg-gray-900 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
