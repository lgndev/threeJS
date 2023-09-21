import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const SpaceShipContoller2 = () => {
  const groupRef = useRef();
  const reticlePlaneRef = useRef();
  const reticlePlaneArgs = [4, 4];
  const reticleRef = useRef();
  const reticleArgs = [1, 1];

  useFrame((state) => {
    const mouseVPX = state.mouse.x * (state.viewport.width / 2);
    const mouseVPY = state.mouse.y * (state.viewport.height / 2);
    const parentOffsetX = reticlePlaneRef.current.parent.position.x;
    const parentOffsetY = reticlePlaneRef.current.parent.position.y;
    const minPlaneX = -reticlePlaneArgs[0] / 2;
    const maxPlaneX = reticlePlaneArgs[0] / 2;
    const minPlaneY = -reticlePlaneArgs[1] / 2;
    const maxPlaneY = reticlePlaneArgs[1] / 2;

    // reticleRef should follow mouse position
    // clamp reticleRef to min/max x dimension of reticlePlaneRef
    // - when position is set on containing group, position of meshes remain unchanged ([0,0,0])
    // -- have to consider parent dimensions in calcuations
    if (mouseVPX < minPlaneX + parentOffsetX) {
      reticleRef.current.position.x = minPlaneX;
    } else if (mouseVPX > maxPlaneX + parentOffsetX) {
      reticleRef.current.position.x = maxPlaneX;
    } else {
      reticleRef.current.position.x = mouseVPX - parentOffsetX;
    }

    // reticleRef should follow mouse position
    // clamp reticleRef to min/max y dimension of reticlePlaneRef
    if (mouseVPY < minPlaneY + parentOffsetY) {
      reticleRef.current.position.y = minPlaneY;
    } else if (mouseVPY > maxPlaneY + parentOffsetY) {
      reticleRef.current.position.y = maxPlaneY;
    } else {
      reticleRef.current.position.y = mouseVPY - parentOffsetY;
    }

    // move groupRef to mouse position overtime if mouse position is outside bounds of reticlePlaneRef
    if (mouseVPX < minPlaneX + parentOffsetX) {
      if (state.mouse.x < 0) {
        groupRef.current.position.x -= 0.03;
      } else {
        groupRef.current.position.x += 0.03;
      }
    } else if (mouseVPX > maxPlaneX + parentOffsetX) {
      if (state.mouse.x < 0) {
        groupRef.current.position.x -= 0.03;
      } else {
        groupRef.current.position.x += 0.03;
      }
    }

    if (mouseVPY < minPlaneY + parentOffsetY) {
      if (state.mouse.y < 0) {
        groupRef.current.position.y -= 0.03;
      } else {
        groupRef.current.position.y += 0.03;
      }
    } else if (mouseVPY > maxPlaneY + parentOffsetY) {
      if (state.mouse.y < 0) {
        groupRef.current.position.y -= 0.03;
      } else {
        groupRef.current.position.y += 0.03;
      }
    }
  });
  return (
    <group ref={groupRef}>
      <mesh ref={reticlePlaneRef}>
        <planeGeometry args={reticlePlaneArgs} />
        <meshStandardMaterial wireframe wireframeLinewidth={1} color="gray" />
      </mesh>
      <mesh ref={reticleRef}>
        <planeGeometry args={reticleArgs} />
        <meshStandardMaterial wireframe wireframeLinewidth={2} color="red" />
      </mesh>
    </group>
  );
};

export default SpaceShipContoller2;
