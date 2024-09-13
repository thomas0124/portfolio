'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

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
  { name: 'Pytorch', icon: 'pytorch-original.svg' },
  { name: 'C#', icon: 'csharp-original.svg' },
  { name: 'Rust', icon: 'rust-original.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss-original.svg' },
  { name: 'Three.js', icon: 'threejs-original.svg' },
  { name: 'Prisma', icon: 'prisma-original.svg' },
  { name: 'GraphQL', icon: 'graphql-plain.svg' },
  { name: 'PostgreSQL', icon: 'postgresql-original.svg' },
  { name: 'Docker', icon: 'docker-original.svg' },
  { name: 'Bun', icon: 'bun-original.svg' },
  { name: 'Unity', icon: 'unity-original.svg' },
  { name: 'Azure', icon: 'azure-original.svg' },
  { name: 'AWS', icon: 'amazonwebservices-original-wordmark.svg' },
  { name: 'Linux', icon: 'linux-original.svg' }
]

interface SkillsGlobeProps {
  onHoverSkill: Dispatch<SetStateAction<string | null>>
}

const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ onHoverSkill }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

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

    // Improved globe
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x3a3a3a,
      wireframe: true,
      emissive: 0x1a1a1a,
      shininess: 10,
      transparent: true,
      opacity: 0.8
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 3, 5)
    scene.add(pointLight)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    const textureLoader = new THREE.TextureLoader()
    const sprites: THREE.Sprite[] = []

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
      sprite.scale.set(0.4, 0.4, 1)
      sprite.userData = { skillName: skill.name }

      scene.add(sprite)
      sprites.push(sprite)
    })

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
    composer.addPass(bloomPass)

    // Raycaster for hover effect
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(sprites)

      if (intersects.length > 0) {
        const hoveredSprite = intersects[0].object as THREE.Sprite
        setHoveredSkill(hoveredSprite.userData.skillName)
        onHoverSkill(hoveredSprite.userData.skillName)
        hoveredSprite.scale.set(0.6, 0.6, 1)
      } else {
        setHoveredSkill(null)
        onHoverSkill(null)
        sprites.forEach((sprite) => sprite.scale.set(0.4, 0.4, 1))
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      globe.rotation.y += 0.001
      particlesMesh.rotation.y += 0.0005

      composer.render()
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      composer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onHoverSkill])

  return (
    <div className="relative w-full h-[800px]">
      <div ref={containerRef} className="w-full h-full" />
      {hoveredSkill && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-70 text-white px-4 py-2 rounded-full">
          {hoveredSkill}
        </div>
      )}
    </div>
  )
}

export default SkillsGlobe
