import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { easing } from "maath";
import Knight from "./Knight.jsx";

const Rig = () => {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5],
      0.2,
      delta
    );
  });
};

const CharacterAnimationsDemo = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper position={[0, 0, 0]} args={[2]} />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize={1024}
      />
      <group position={[0, -1, 0]}>
        <Suspense fallback={null}>
          <Knight />
        </Suspense>
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default CharacterAnimationsDemo;
