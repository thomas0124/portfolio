'use client'

import type React from 'react'
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { skills } from '@/data/skills'

interface SkillsGlobeProps {
  onHoverSkill: Dispatch<SetStateAction<string | null>>
}

const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ onHoverSkill }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const hoveredSkillRef = useRef<string | null>(null)

  useEffect(() => {
    hoveredSkillRef.current = hoveredSkill
  }, [hoveredSkill])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    camera.position.z = 5

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x3b82f6, 1.5)
    pointLight.position.set(5, 3, 5)
    scene.add(pointLight)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000 // モバイル向けに少し減らす
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

    const isMobile = window.innerWidth < 768
    const spriteScale = isMobile ? 0.3 : 0.4
    const spriteHoverScale = isMobile ? 0.45 : 0.6

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
      sprite.scale.set(spriteScale, spriteScale, 1)
      sprite.userData = { skillName: skill.name }

      scene.add(sprite)
      sprites.push(sprite)
    })

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5,
      0.4,
      0.85
    )
    composer.addPass(bloomPass)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(sprites)

      if (intersects.length > 0) {
        const hoveredSprite = intersects[0].object as THREE.Sprite
        setHoveredSkill(hoveredSprite.userData.skillName)
        onHoverSkill(hoveredSprite.userData.skillName)
        hoveredSprite.scale.set(spriteHoverScale, spriteHoverScale, 1)
      } else {
        setHoveredSkill(null)
        onHoverSkill(null)
        sprites.forEach((sprite) => sprite.scale.set(spriteScale, spriteScale, 1))
      }
    }
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return

      const rect = container.getBoundingClientRect()
      const touch = event.touches[0]

      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(sprites)

      if (intersects.length > 0) {
        const hoveredSprite = intersects[0].object as THREE.Sprite
        setHoveredSkill(hoveredSprite.userData.skillName)
        onHoverSkill(hoveredSprite.userData.skillName)
        hoveredSprite.scale.set(spriteHoverScale, spriteHoverScale, 1)
      } else {
        setHoveredSkill(null)
        onHoverSkill(null)
        sprites.forEach((sprite) => sprite.scale.set(spriteScale, spriteScale, 1))
      }
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove as EventListener)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      composer.render()
    }

    animate()
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768
      const newSpriteScale = newIsMobile ? 0.3 : 0.4

      sprites.forEach((sprite) => {
        if (sprite.userData.skillName !== hoveredSkillRef.current) {
          sprite.scale.set(newSpriteScale, newSpriteScale, 1)
        }
      })

      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      composer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (container) {
        container.removeChild(renderer.domElement)
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('touchmove', onTouchMove as EventListener)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [onHoverSkill])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
    </div>
  )
}

export default SkillsGlobe
