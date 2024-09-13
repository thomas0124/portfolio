'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'

type TechStack = {
  name: string
  icon: string
}

type Project = {
  id: string
  name: string
  description: string
  github: string
  techStack: TechStack[]
}

const projects: Project[] = [
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
  }
]

interface ProjectCardProps {
  project: Project
  isCenter: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isCenter }) => (
  <div
    className={`border-white shadow-lg p-5 w-full md:w-[calc(100%/3)] h-96 flex flex-col justify-between items-center snap-center mx-2 mt-4 mb-16 flex-shrink-0 transition-all duration-300 ${
      isCenter ? 'md:scale-110' : 'md:scale-75 md:opacity-70'
    }`}
  >
    <h2 className="text-2xl text-white font-bold text-center">{project.name}</h2>
    <p className="text-center text-2xl text-white mt-1">{project.description}</p>
    <p className="text-xl">技術スタック</p>
    <div className="flex justify-center space-x-4">
      {project.techStack.map((tech) => (
        <div key={tech.name} className="flex flex-col items-center">
          <Image src={tech.icon} alt={tech.name} width={40} height={40} />
          <span className="text-sm text-white mt-1">{tech.name}</span>
        </div>
      ))}
    </div>
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex items-center bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
    >
      <FaGithub className="mr-2" aria-hidden="true" />
      <span>GitHub</span>
    </a>
  </div>
)

export default function ProjectCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [centerIndex, setCenterIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { offsetWidth, scrollLeft } = scrollRef.current
      const itemWidth = isMobile ? offsetWidth : offsetWidth / 3
      const index = Math.round((scrollLeft + itemWidth / 2) / itemWidth) % projects.length
      setCenterIndex(index)
    }
  }, [isMobile])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      handleResize()
      window.addEventListener('resize', handleResize)
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [handleResize, handleScroll])

  return (
    <section className="relative w-full h-auto p-4 md:p-10 overflow-hidden mt-11">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {[...projects, ...projects, ...projects].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${Math.floor(index / projects.length)}`}
            project={project}
            isCenter={index % projects.length === centerIndex}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {projects.map((project, index) => (
          <div
            key={`pagination-${project.id}`}
            className={`w-3 h-3 rounded-full ${centerIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label={`Project ${index + 1} of ${projects.length}`}
          />
        ))}
      </div>
    </section>
  )
}
