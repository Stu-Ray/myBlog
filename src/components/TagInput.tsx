'use client'

import { useState, useEffect } from 'react'

export default function TagInput({
  value = [],
  onChange,
  placeholder = '添加标签后回车',
}: {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}) {
  const [input, setInput] = useState('')

  const addTag = (tag: string) => {
    const clean = tag.trim()
    if (clean && !value.includes(clean)) {
      onChange([...value, clean])
    }
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && input === '') {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded">
      {value.map((tag) => (
        <span
          key={tag}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 text-xs hover:text-red-500"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[100px] p-1 outline-none"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
