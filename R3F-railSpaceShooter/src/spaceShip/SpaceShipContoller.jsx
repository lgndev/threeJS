import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const SpaceShipContoller = () => {
  const boundingBoxRef = useRef();
  const boundingBoxDimensions = { x: 4, y: 4, z: 4 };
  const sphereRef = useRef();
  const sphereArgs = { r: 0.25, a: 32, b: 16 };
  const reticleRef = useRef();

  useFrame((state) => {
    //...
    if (state.mouse.x >= 0) {
      if (
        state.mouse.x * (state.viewport.width / 2) >
        boundingBoxDimensions.x / 2 +
          boundingBoxRef.current.position.x -
          sphereArgs.r
      ) {
        reticleRef.current.position.x =
          boundingBoxDimensions.x / 2 +
          boundingBoxRef.current.position.x -
          sphereArgs.r;
      } else {
        reticleRef.current.position.x =
          state.mouse.x * (state.viewport.width / 2);
      }
    } else {
      if (
        state.mouse.x * (state.viewport.width / 2) <
        -(boundingBoxDimensions.x / 2) +
          boundingBoxRef.current.position.x +
          sphereArgs.r
      ) {
        reticleRef.current.position.x =
          -(boundingBoxDimensions.x / 2) +
          boundingBoxRef.current.position.x +
          sphereArgs.r;
      } else {
        reticleRef.current.position.x =
          state.mouse.x * (state.viewport.width / 2);
      }
    }

    if (state.mouse.y >= 0) {
      if (
        state.mouse.y * (state.viewport.height / 2) >
        boundingBoxDimensions.y / 2 +
          boundingBoxRef.current.position.y -
          sphereArgs.r
      ) {
        reticleRef.current.position.y =
          boundingBoxDimensions.y / 2 +
          boundingBoxRef.current.position.y -
          sphereArgs.r;
      } else {
        reticleRef.current.position.y =
          state.mouse.y * (state.viewport.height / 2);
      }
    } else {
      if (
        state.mouse.y * (state.viewport.height / 2) <
        -(boundingBoxDimensions.y / 2) +
          boundingBoxRef.current.position.y +
          sphereArgs.r
      ) {
        reticleRef.current.position.y =
          -(boundingBoxDimensions.y / 2) +
          boundingBoxRef.current.position.y +
          sphereArgs.r;
      } else {
        reticleRef.current.position.y =
          state.mouse.y * (state.viewport.height / 2);
      }
    }

    // reticleRef.current.position.y = state.mouse.y * (state.viewport.height / 2);
  });
  return (
    <group position={[3, 0, 0]}>
      <mesh castShadow ref={boundingBoxRef}>
        <boxGeometry args={Object.values(boundingBoxDimensions)} />
        <meshStandardMaterial wireframe color="red" />
      </mesh>
      <mesh
        castShadow
        position={[0, 0, -(boundingBoxDimensions.z / 2)]}
        ref={reticleRef}
      >
        <sphereGeometry args={Object.values(sphereArgs)} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default SpaceShipContoller;
