import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

interface LoadScreenProps {
  onComplete: () => void
}

const StarGeometry = () => {
  const starShape = new THREE.Shape()
  starShape.moveTo(0, 0.5)
  starShape.lineTo(0.15, 0.15)
  starShape.lineTo(0.5, 0.15)
  starShape.lineTo(0.2, -0.1)
  starShape.lineTo(0.3, -0.5)
  starShape.lineTo(0, -0.25)
  starShape.lineTo(-0.3, -0.5)
  starShape.lineTo(-0.2, -0.1)
  starShape.lineTo(-0.5, 0.15)
  starShape.lineTo(-0.15, 0.15)
  starShape.lineTo(0, 0.5)

  const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: false
  }

  const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings)

  return <primitive object={geometry} />
}

const MovingStar = () => {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.x += delta * -2 // x方向に速度を与える
      mesh.current.position.y += delta * -1 // y方向に速度を与える
      mesh.current.position.z -= delta * -2 // z方向に速度を与える
    }
  })

  return (
    <mesh ref={mesh}>
      <StarGeometry />
      <meshStandardMaterial color={'#FFFF99'} />
    </mesh>
  )
}

const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null!)

  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []

    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2500)
      const y = THREE.MathUtils.randFloatSpread(2500)
      const z = THREE.MathUtils.randFloatSpread(2500)

      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({ color: 0x888888 })
    particlesRef.current.geometry = geometry
    particlesRef.current.material = material
  }, [])

  return <points ref={particlesRef} />
}

const LoadScreen: React.FC<LoadScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 20000) // 20秒後にホーム画面へ遷移

    return () => clearTimeout(timer)
  }, [onComplete])

  const text = 'Hello World!'

  const letters = text.split('').map((char, index) => (
    <span
      key={index}
      className="inline-block opacity-0"
      style={{ animation: 'fadeIn 0.5s ease forwards', animationDelay: `${index * 0.2}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-black relative">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MovingStar />
        <ParticleSystem />
        <Stars />
        <OrbitControls />
      </Canvas>
      <h1 className="absolute text-white text-8xl animate-pulse">{letters}</h1>
    </div>
  )
}

export default LoadScreen
