'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface LoadScreenProps {
  onComplete: () => void
}

const Scene: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.5
      mesh.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

const LoadScreen: React.FC<LoadScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000) // 3秒後にホーム画面へ遷移

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene />
        <OrbitControls />
      </Canvas>
      <h1 className="absolute text-white text-4xl animate-pulse">Loading...</h1>
    </div>
  )
}

export default LoadScreen
