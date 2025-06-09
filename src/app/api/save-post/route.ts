import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { pinyin } from 'pinyin-pro'

export async function POST(req: NextRequest) {
  try {
    const { title, content, tags, slug: providedSlug, coverUrl } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: '标题和内容不能为空' }, { status: 400 })
    }

    const dir = path.join(process.cwd(), 'content')
    await fs.mkdir(dir, { recursive: true })

    let slug = providedSlug
    if (!slug) {
      const pinyinSlug = pinyin(title, { toneType: 'none', type: 'array' })
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
      slug = pinyinSlug || Date.now().toString()
    }

    const filePath = path.join(dir, `${slug}.json`)
    const isEdit = !!providedSlug

    let createdAt = new Date().toISOString()
    if (isEdit) {
      try {
        const oldData = await fs.readFile(filePath, 'utf-8')
        const oldPost = JSON.parse(oldData)
        createdAt = oldPost.createdAt || createdAt
      } catch {
        // 忽略错误，继续使用当前时间
      }
    }

    const post = {
      title,
      content,
      slug,
      tags: Array.isArray(tags) ? tags : [],
      coverUrl: coverUrl || '',
      createdAt,
      updatedAt: new Date().toISOString(),
    }

    await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8')

    return NextResponse.json({ success: true, slug })
  } catch (error: any) {
    console.error('❌ 保存失败:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}
