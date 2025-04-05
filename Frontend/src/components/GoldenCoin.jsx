import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Cylinder, Torus, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function CoinModel() {
  const coinRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    coinRef.current.rotation.y = time * 0.5;
    glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
  });

  return (
    <group position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.1} />
      </mesh>

      <group ref={coinRef}>
        
        <Cylinder args={[2, 2, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </Cylinder>

        {/* Coin rim with detailed geometry */}
        <Torus args={[2, 0.2, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>

        {/* Dollar symbol on both sides */}
        <Text
          position={[0, 0, 0.15]}
          scale={[1, 1, 1]}
          color="#B8860B"
          fontSize={1.5}
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          $
        </Text>
        <Text
          position={[0, 0, -0.15]}
          scale={[1, 1, 1]}
          color="#B8860B"
          fontSize={1.5}
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          $
        </Text>
      </group>
    </group>
  );
}

export default function GoldenCoin() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <CoinModel />

      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI * 2/3}
      />
    </Canvas>
  );
}