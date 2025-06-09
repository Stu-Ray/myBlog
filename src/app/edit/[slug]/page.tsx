import fs from 'fs/promises'
import path from 'path'
import Editor from '@/components/Editor'

export default async function EditPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.json`)
  const raw = await fs.readFile(filePath, 'utf-8')
  const post = JSON.parse(raw)

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">✏️ 编辑文章</h1>
      <Editor initialData={post} />
    </main>
  )
}
