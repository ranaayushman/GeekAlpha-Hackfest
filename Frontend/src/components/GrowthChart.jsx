import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/model.glb'); 
  

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('#FFD700'); 
      child.material.metalness = 1;
      child.material.roughness = 0.2;
    }
  });

  return <primitive object={scene} scale={900} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} />;
}

export default function GrowthChart() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]  bg-black">
      <Canvas camera={{ position: [10, 20, 30], fov: 100 }} shadows>
        <ambientLight intensity={12.5} />
        <directionalLight position={[5, 15, 5]} intensity={4} castShadow />
        <spotLight position={[-10, 15, -5]} angle={0.3} penumbra={1} intensity={2} />

        <group>
          <Model />
        </group>

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enableZoom={false} 
          enableRotate={true}
          autoRotate
          autoRotateSpeed={3.5}
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2} 
          minAzimuthAngle={-Math.PI / 1} 
          maxAzimuthAngle={Math.PI / 1} 
        />
      </Canvas>
    </div>
  );
}

