import pinyin from 'pinyin'

export function slugify(title: string): string {
  const result = pinyin(title, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false,
  })

  // 扁平化二维数组并用 '-' 连接
  return result.flat().join('-').toLowerCase().replace(/[^\w\-]/g, '')
}
