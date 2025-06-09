import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { unlink } from 'fs/promises'

export async function POST(req: NextRequest) {
  const { slug } = await req.json()

  if (!slug) {
    return NextResponse.json({ error: '缺少 slug 参数' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'content', `${slug}.json`)
    await unlink(filePath)
    return NextResponse.json({ message: '文章已删除' })
  } catch (error) {
    return NextResponse.json({ error: '删除失败：' + String(error) }, { status: 500 })
  }
}
