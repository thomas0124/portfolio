'use client'

import { useState, useRef, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'

type Project = {
  id: string
  name: string
  description: string
  github: string
  image: string
}

const projects: Project[] = [
  {
    id: 'mamoru',
    name: 'まもるくん',
    description: '子供の安全を守るためのIoTデバイスとアプリケーション',
    github: 'https://github.com/jphacks/C_2208',
    image: '/mamoru.png'
  },
  {
    id: 'areal',
    name: 'areal-AirReal',
    description: 'ARを活用した革新的な不動産内覧システム',
    github: 'https://github.com/hibiki0612/areal-AirReal',
    image: '/areal.png'
  },
  {
    id: 'gunmamon',
    name: 'ぐんまもん',
    description: '群馬県の魅力を発信するAI搭載キャラクターアプリ',
    github: 'https://github.com/y4asse/gunmamon',
    image: '/gunmamon.png'
  },
  {
    id: 'armor',
    name: 'Adversarial Armor',
    description: 'AIモデルを保護するための敵対的防御システム',
    github: 'https://github.com/jphacks/NG_2303',
    image: '/armor.png'
  },
  {
    id: 'advert',
    name: 'ADvertEX',
    description: 'AIを用いた次世代型広告最適化プラットフォーム',
    github: 'https://github.com/thomas0124/HACK_U_Meijo_2023',
    image: '/advert.png'
  }
]

interface ProjectCardProps {
  project: Project
  isCenter: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isCenter }) => (
  <div
    className={`bg-white shadow-lg p-5 w-full md:w-[calc(100%/3)] h-96 flex flex-col justify-between items-center snap-center mx-2 mt-4 mb-16 flex-shrink-0 transition-all duration-300 ${
      isCenter ? 'md:scale-110' : 'md:scale-75 md:opacity-70'
    }`}
  >
    <Image
      src={project.image}
      alt={`${project.name} image`}
      width={128}
      height={128}
      className="w-full h-32 object-cover mb-4 rounded-lg"
    />
    <h2 className="text-2xl font-bold text-center">{project.name}</h2>
    <p className="text-center text-gray-600 mt-2">{project.description}</p>
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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { offsetWidth, scrollLeft } = scrollRef.current
        const itemWidth = offsetWidth / 3
        const index = Math.round((scrollLeft + itemWidth / 2) / itemWidth) % projects.length
        setCenterIndex(index)
      }
    }

    const scrollElement = scrollRef.current
    scrollElement?.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => scrollElement?.removeEventListener('scroll', handleScroll)
  }, [])

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
