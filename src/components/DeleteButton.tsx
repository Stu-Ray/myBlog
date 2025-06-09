'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter()

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
      alert('删除失败')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      删除
    </button>
  )
}
