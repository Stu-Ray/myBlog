import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function GET() {
  const dir = path.join(process.cwd(), 'content')
  try {
    const files = await fs.readdir(dir)
    const posts = await Promise.all(
      files.map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf-8')
        const post = JSON.parse(raw)
        return post
      })
    )
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: '无法读取博客数据' }, { status: 500 })
  }
}
