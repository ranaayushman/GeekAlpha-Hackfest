

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
     
    </div>
  );
}

