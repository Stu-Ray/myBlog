import EditorWrapper from './editor-wrapper'

export default function HomePage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Markdown-Style 编辑器</h1>
      <EditorWrapper />
    </main>
  )
}
