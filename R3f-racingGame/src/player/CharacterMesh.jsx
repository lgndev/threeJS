import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const CharacterMesh = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const reticleRef = useRef();
  const meshRef = useRef();
  const { camera, size } = useThree();
  var vec = new THREE.Vector3(); // create once and reuse
  var pos = new THREE.Vector3(); // create once and reuse
  const { nodes, materials } = useGLTF("/+y.glb");
  // console.log(nodes.StarSparrow1.geometry);
  // console.log(materials.StarSparrow_Yellow);

  useFrame((state) => {
    // const reticlePosition = new THREE.Vector3(state.mouse.x, state.mouse.y, 0);
    const { up, down, left, right } = getKeys();
    if (up) {
      meshRef.current.position.y += 0.1;
    } else if (down) {
      meshRef.current.position.y -= 0.02;
    } else if (left) {
      meshRef.current.position.x -= 0.02;
    } else if (right) {
      meshRef.current.position.x += 0.02;
    }
    meshRef.current.lookAt(reticleRef.current.position);
    reticleRef.current.position.x = state.mouse.x * (state.viewport.width / 2);
    reticleRef.current.position.y = state.mouse.y * (state.viewport.height / 2);
    reticleRef.current.position.z = 0;
  });

  return (
    // <group ref={meshRef}>
    //   {/* <mesh castShadow scale={1}>
    //     <boxGeometry />
    //     <meshStandardMaterial wireframe color="red" />
    //   </mesh> */}
    //   <mesh castShadow scale={0.5}>
    //     <boxGeometry />
    //   </mesh>
    //   <mesh castShadow scale={[2, 0.05, 0.5]}>
    //     <boxGeometry />
    //   </mesh>
    // </group>
    <>
      <group>
        <mesh castShadow scale={0.25} ref={reticleRef}>
          <sphereGeometry />
          <meshStandardMaterial color="transparent" />
        </mesh>
        <mesh
          ref={meshRef}
          geometry={nodes.StarSparrow1.geometry}
          material={materials.StarSparrow_Yellow}
          scale={0.001}
          position={[0, 0, 10]}
          rotation={[0, Math.PI, 0]}
          // rotation={[-Math.PI / 2, Math.PI, 0]}
          // rotation={[-Math.PI / 2 + 1, Math.PI + 1, 0]}
        />
      </group>
    </>
  );
};

export default CharacterMesh;
