import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false, // 关闭默认 JSON 解析
  },
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: '请上传图片文件' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const filePath = path.join(uploadsDir, filename)

  await fs.writeFile(filePath, buffer)

  const url = `/uploads/${filename}`
  return NextResponse.json({ success: true, url })
}
