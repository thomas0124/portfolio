import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'mamoru',
    name: 'まもるくん',
    description: '情報が義務化された社会でネットリテラシーを楽しんで学ぶlinebot',
    github: 'https://github.com/jphacks/C_2208',
    techStack: [
      { name: 'Python', icon: 'python-original.svg' },
      { name: 'LINE Messaging API', icon: '/line-messaging-api.jpeg' },
      { name: 'html', icon: '/html5-original.svg' },
      { name: 'css', icon: '/css-original.svg' }
    ]
  },
  {
    id: 'areal',
    name: 'areal-AirReal',
    description: '新宿の街に自分だけのキャンパス(絵)を設置し、周囲の人と共有するARアプリ',
    github: 'https://github.com/hibiki0612/areal-AirReal',
    techStack: [
      { name: 'Unity', icon: '/unity-original.svg' },
      { name: 'PLATEAU', icon: '/plateau.png' },
      { name: 'ARKit', icon: '/arkit.png' },
      { name: 'ARCore', icon: '/arcore.png' }
    ]
  },
  {
    id: 'gunmamon',
    name: 'ぐんまもん',
    description: '運動しながらGitHubにcommitするというの実現するWebアプリ',
    github: 'https://github.com/y4asse/gunmamon',
    techStack: [
      { name: 'Next.js', icon: '/nextjs-original.svg' },
      { name: 'TypeScript', icon: '/typescript-original.svg' },
      { name: 'MongoDB', icon: '/mongodb-original.svg' },
      { name: 'Google Fit API', icon: '/google-fit-api.png' },
      { name: 'GitHub API', icon: '/github.jpeg' }
    ]
  },
  {
    id: 'armor',
    name: 'Adversarial Armor',
    description: 'AIを騙すような画像を自分たちは見極めることができるのかを確認できるWebアプリ',
    github: 'https://github.com/jphacks/NG_2303',
    techStack: [
      { name: 'React', icon: '/react-original.svg' },
      { name: 'Rust', icon: '/rust-original.svg' },
      { name: 'AWS', icon: '/amazonwebservices-original-wordmark.svg' },
      { name: 'GCP', icon: '/google-cloud-original.svg' }
    ]
  },
  {
    id: 'advert',
    name: 'ADvertEX',
    description: '広告の画像から、自分だけのキャラクターを作りスキルを駆使して戦闘をするゲーム',
    github: 'https://github.com/thomas0124/HACK_U_Meijo_2023',
    techStack: [
      { name: 'Next.js', icon: '/nextjs-original.svg' },
      { name: 'Auth.js', icon: '/nextauth.png' },
      { name: 'FastAPI', icon: '/fastapi-original.svg' },
      { name: 'OpenCV', icon: '/opencv-original.svg' },
      { name: 'Unity', icon: '/unity-original.svg' }
    ]
  },
  {
    id: 'ecobiz',
    name: 'Ecobiz',
    description:
      '『歩いている時間』 ユーザーが歩くことでゲーム内通貨を貯めることができ、その通貨を利用して自分の仮想の会社を経営していくアプリケーション',
    github: 'https://github.com/tasogare-88/EcoBiz',
    techStack: [
      { name: 'Flutter', icon: '/Flutter Icon.svg' },
      { name: 'Dart', icon: '/Dart Icon.svg' },
      { name: 'Unity', icon: '/unity-original.svg' },
      { name: 'Firebase', icon: '/Firebase Icon.svg' },
      { name: 'GitHub Actions', icon: '/GitHub Actions Icon.svg' }
    ]
  }
]
