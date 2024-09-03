import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'

interface LoadScreenProps {
  onComplete: () => void
}

const StarGeometry = () => {
  const starShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.5)
    shape.lineTo(0.15, 0.15)
    shape.lineTo(0.5, 0.15)
    shape.lineTo(0.2, -0.1)
    shape.lineTo(0.3, -0.5)
    shape.lineTo(0, -0.25)
    shape.lineTo(-0.3, -0.5)
    shape.lineTo(-0.2, -0.1)
    shape.lineTo(-0.5, 0.15)
    shape.lineTo(-0.15, 0.15)
    shape.lineTo(0, 0.5)
    return shape
  }, [])

  const extrudeSettings = useMemo(
    () => ({
      steps: 2,
      depth: 0.1,
      bevelEnabled: false
    }),
    []
  )

  const geometry = useMemo(() => new THREE.ExtrudeGeometry(starShape, extrudeSettings), [starShape, extrudeSettings])

  return <primitive object={geometry} />
}

const MovingStar = () => {
  const mesh = useRef<THREE.Mesh>(null)
  const rotationSpeed = useRef(Math.random() * 0.02 + 0.01)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.x += delta * -2
      mesh.current.position.y += Math.sin(state.clock.elapsedTime) * delta
      mesh.current.position.z -= delta * -2
      mesh.current.rotation.x += rotationSpeed.current
      mesh.current.rotation.y += rotationSpeed.current
      mesh.current.rotation.z += rotationSpeed.current

      // Reset position when star goes out of view
      if (mesh.current.position.x < -10) mesh.current.position.x = 10
      if (mesh.current.position.y < -10) mesh.current.position.y = 10
      if (mesh.current.position.z < -10) mesh.current.position.z = 10
    }
  })

  return (
    <mesh ref={mesh} position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}>
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
      const x = THREE.MathUtils.randFloatSpread(2000)
      const y = THREE.MathUtils.randFloatSpread(2000)
      const z = THREE.MathUtils.randFloatSpread(2000)

      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({ color: 0x888888, size: 0.7, sizeAttenuation: true })
    particlesRef.current.geometry = geometry
    particlesRef.current.material = material
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return <points ref={particlesRef} />
}

const AnimatedText = ({ text }: { text: string }) => {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Text
      ref={textRef}
      color="white"
      fontSize={1}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

const LoadScreen: React.FC<LoadScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 20000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <MovingStar key={i} />
          ))}
        <ParticleSystem />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
        <AnimatedText text="Hello World!" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default LoadScreen
