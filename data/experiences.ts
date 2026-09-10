export type ExperienceCategory = 'event' | 'internship' | 'community' | '' // カテゴリなしも許容

export interface Experience {
  date: string
  content: string
  description?: string
  category: ExperienceCategory
  url?: string
}

export const experiences: Experience[] = [
  { date: '2022年4月', content: 'IdeaxTech', description: '参加', category: 'community' },
  { date: '2022年10月', content: 'JPHACKS 2022', description: 'Huawei Japan賞取得', category: 'event', url: 'https://jphacks.com/information/pitch-result-2022/' },
  { date: '2022年12月', content: 'withARハッカソン', description: '新宿NEUUにて作品展示', category: 'event' },
  { date: '2023年2月', content: 'ハーバード大学 CS50', description: '修了', category: 'event' },
  { date: '2023年6月', content: 'Infratop', description: 'DMM Web CAMPメンター', category: 'internship' },
  { date: '2023年10月', content: 'JPHACKS 2023', description: 'GMO賞取得', category: 'event', url: 'https://www.meijo-u.ac.jp/news/detail_29431.html' },
  { date: '2023年12月', content: 'Hack U Meijo', description: '審査員賞取得', category: 'event', url: 'https://hacku.yahoo.co.jp/meijo2023/' },
  { date: '2024年3月', content: 'IdeaxTech', description: '代表就任', category: 'community', url: 'https://www.meijo-u.ac.jp/mag/manabi/project/article-enjoy-2024-01.html' },
  {
    date: '2024年8月',
    content: '株式会社マナビティ',
    description: '不動産ポータル・ホテルアポイントメントサービス',
    category: 'internship'
  },
  {
    date: '2025年9月',
    content: 'DMM.com合同会社',
    description: 'DMM GUILD 2025 複数技術賞・Thanksポイント賞受賞',
    category: 'internship',
    url: 'https://note.com/tomas_0124/n/nb352c535b296'
  },
  { date: '2025年9月', content: 'DATUM STUDIO株式会社', description: 'text2SQL技術', category: 'internship', url: 'https://note.com/tomas_0124/n/na662a16832e8' },
  { date: '2027年4月', content: 'DMM.com合同会社', description: '新卒入社予定', category: '', url: 'https://dmm-corp.com/' }
]
