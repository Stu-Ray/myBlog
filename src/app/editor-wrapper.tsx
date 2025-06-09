'use client'

import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => <p>加载编辑器中...</p>,
})

export default function EditorWrapper() {
  return (
    <div>
      <Editor />
    </div>
  )
}
