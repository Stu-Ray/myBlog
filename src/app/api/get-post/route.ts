import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { readFile } from 'fs/promises'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: '缺少 slug' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'content', `${slug}.json`)

  try {
    const file = await readFile(filePath, 'utf-8')
    const post = JSON.parse(file)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: '读取失败' }, { status: 500 })
  }
}
