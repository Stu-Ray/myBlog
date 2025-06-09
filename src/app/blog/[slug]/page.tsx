'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import PostDetailSkeleton from '@/components/PostDetailSkeleton'
import { notFound } from 'next/navigation'

interface Post {
  title: string
  slug: string
  content: string
  tags?: string[]
  coverUrl?: string
  updatedAt: string
}

export default function PostDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/get-post?slug=${slug}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        if (!data?.title) {
            notFound() // 如果没有文章，跳转 404
        }
        setPost(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  const handleDelete = async () => {
    const confirmed = confirm('确定要删除这篇文章吗？')
    if (!confirmed) return

    const res = await fetch('/api/delete-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })

    if (res.ok) {
      router.push('/blog')
    } else {
      alert('删除失败，请稍后重试')
    }
  }

  if (loading) return <PostDetailSkeleton />
  if (error || !post) return <div className="text-center py-12 text-gray-500">❌ 文章加载失败或不存在！</div>

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      {/* 封面图 */}
      {post.coverUrl && (
        <img src={post.coverUrl} alt="封面图" className="w-full h-64 object-cover rounded mb-6" />
      )}

      {/* 标题 + 时间 */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">🕒 更新于 {dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm')}</p>

      {/* 编辑 & 删除按钮 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push(`/edit/${post.slug}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded"
        >
          ✏️ 编辑
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
        >
          🗑️ 删除
        </button>
      </div>

      {/* 正文 */}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
