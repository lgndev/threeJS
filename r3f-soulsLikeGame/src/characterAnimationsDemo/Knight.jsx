/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/knight_idle.gltf 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Knight = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/knight_idle.gltf");
  const { actions, names } = useAnimations(animations, group);
  console.log(names);
  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.0001}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Character_Knight_02"
            geometry={nodes.Character_Knight_02.geometry}
            material={materials.blinn5}
            skeleton={nodes.Character_Knight_02.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

export default Knight;

useGLTF.preload("./models/knight_idle.gltf");