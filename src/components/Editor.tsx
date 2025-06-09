'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TagInput from './TagInput'
import ImageCropper from './ImageCropper'

export default function Editor({ initialData }: { initialData?: any }) {
  const router = useRouter()

  const [title, setTitle] = useState(initialData?.title || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [message, setMessage] = useState('')
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || '')
  const [cropSrc, setCropSrc] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'editor-container min-h-[200px] border rounded border-gray-300 p-3 text-base sm:text-lg',
      },
    },
  })

  const handleSave = async () => {
    const content = editor?.getHTML()
    if (!title || !content) {
      setMessage('❗请填写标题和内容')
      return
    }

    const res = await fetch('/api/save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        tags,
        coverUrl,
        slug: initialData?.slug || undefined,
      }),
    })

    const result = await res.json()
    if (res.ok) {
      router.push(`/blog/${result.slug}`)
    } else {
      setMessage(`❌ 保存失败：${result.error}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <input
        type="text"
        placeholder="请输入文章标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-lg"
      />

      <TagInput value={tags} onChange={setTags} placeholder="输入标签，回车添加" />

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = () => {
                if (reader.result) {
                  setCropSrc(reader.result as string)
                }
              }
              reader.readAsDataURL(file)
            }
          }}
        />
        {coverUrl && (
          <img
            src={coverUrl}
            alt="封面图"
            className="w-full max-h-60 sm:max-h-80 object-cover rounded mt-2"
          />
        )}
      </div>

      <EditorContent editor={editor} />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        保存文章
      </button>

      {message && <p className="text-sm text-red-600">{message}</p>}

      {/* 封面图裁剪器 */}
      {cropSrc && (
        <ImageCropper
          image={cropSrc}
          onClose={() => setCropSrc(null)}
          onCropComplete={async (blob) => {
            const formData = new FormData()
            formData.append('file', new File([blob], `cover-${Date.now()}.jpg`, { type: 'image/jpeg' }))
            const res = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            })
            const result = await res.json()
            if (res.ok) {
              setCoverUrl(result.url)
            } else {
              alert(`上传失败：${result.error}`)
            }
          }}
        />
      )}
    </div>
  )
}