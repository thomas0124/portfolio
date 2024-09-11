'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const skills = [
  { name: 'React', icon: 'react-original.svg' },
  { name: 'Vite', icon: 'vitejs-original.svg' },
  { name: 'Vitest', icon: 'vitest-original.svg' },
  { name: 'Next.js', icon: 'nextjs-original.svg' },
  { name: 'Vue.js', icon: 'vuejs-original.svg' },
  { name: 'JavaScript', icon: 'javascript-original.svg' },
  { name: 'TypeScript', icon: 'typescript-original.svg' },
  { name: 'Ruby', icon: 'ruby-original.svg' },
  { name: 'Rails', icon: 'rails-plain.svg' },
  { name: 'Python', icon: 'python-original.svg' },
  { name: 'Flask', icon: 'flask-original.svg' },
  { name: 'FastAPI', icon: 'fastapi-original.svg' },
  { name: 'Rust', icon: 'rust-original.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss-original.svg' },
  { name: 'Prisma', icon: 'prisma-original.svg' },
  { name: 'GraphQL', icon: 'graphql-plain.svg' },
  { name: 'PostgreSQL', icon: 'postgresql-original.svg' },
  { name: 'Docker', icon: 'docker-original.svg' },
  { name: 'Bun', icon: 'bun-original.svg' },
  { name: 'Azure', icon: 'azure-original.svg' },
  { name: 'AWS', icon: 'amazonwebservices-original-wordmark.svg' },
  { name: 'Linux', icon: 'linux-original.svg' }
]

export default function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    camera.position.z = 5

    const globeGeometry = new THREE.SphereGeometry(2, 32, 32)
    const globeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    const textureLoader = new THREE.TextureLoader()

    skills.forEach((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi

      const texture = textureLoader.load(`/${skill.icon}`)
      const material = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(material)

      const x = 2.5 * Math.cos(theta) * Math.sin(phi)
      const y = 2.5 * Math.sin(theta) * Math.sin(phi)
      const z = 2.5 * Math.cos(phi)

      sprite.position.set(x, y, z)
      sprite.scale.set(0.5, 0.5, 1)

      scene.add(sprite)
    })

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-[800px]" />
}
