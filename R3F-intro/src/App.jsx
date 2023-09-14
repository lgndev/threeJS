import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Fox from "./models/Fox";

const App = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    sphereRef.current.rotation.y += delta;
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh castShadow position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>

      <mesh castShadow position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} />

      <Fox />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default App;
