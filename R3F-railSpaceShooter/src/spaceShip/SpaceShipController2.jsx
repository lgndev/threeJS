import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SpaceShipContoller2 = () => {
  const { nodes, materials } = useGLTF("/StarSparrowGLB.glb");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const prevMouseState = useRef({ x: 0, y: 0 });
  const groupRef = useRef();
  const sparrowMeshRef = useRef();
  const reticlePlaneRef = useRef();
  const reticlePlaneArgs = [6, 8];
  const reticleRef = useRef();
  const reticleArgs = [1, 1];

  // return gamepad current input values
  const getGamepadInputs = () => {
    const controller = navigator.getGamepads()[0];
    const defaultInputs = {
      ls: {
        x: 0,
        y: 0,
      },
      rs: {
        x: 0,
        y: 0,
      },
    };
    if (controller) {
      return {
        ls: {
          x:
            controller.axes[0] > -0.005 && controller.axes[0] < 0.005
              ? 0
              : controller.axes[0],
          y:
            controller.axes[1] > -0.005 && controller.axes[1] < 0.005
              ? 0
              : -controller.axes[1],
        },
        rs: {
          x:
            controller.axes[2] > -0.005 && controller.axes[2] < 0.005
              ? 0
              : controller.axes[2],
          y:
            controller.axes[5] > -0.005 && controller.axes[5] < 0.005
              ? 0
              : -controller.axes[5],
        },
      };
    } else {
      return defaultInputs;
    }
  };

  useFrame((state) => {
    const { ls, rs } = getGamepadInputs();
    const { up, down, left, right } = getKeys();
    const mouseVPX = state.mouse.x * (state.viewport.width / 2);
    const mouseVPY = state.mouse.y * (state.viewport.height / 2);
    const parentOffsetX = reticlePlaneRef.current.parent.position.x;
    const parentOffsetY = reticlePlaneRef.current.parent.position.y;
    const minPlaneX = -reticlePlaneArgs[0] / 2;
    const maxPlaneX = reticlePlaneArgs[0] / 2;
    const minPlaneY = -reticlePlaneArgs[1] / 2;
    const maxPlaneY = reticlePlaneArgs[1] / 2;
    const moveSpeed = { x: 0.02, y: 0.02 };
    const reticleSpeed = { x: 0.1, y: 0.1 };

    // transform groupRef position with gamepad axes values
    if (ls.y > 0 && ls) {
      groupRef.current.position.y += ls.y * moveSpeed.y;
    } else if (ls.y < 0) {
      groupRef.current.position.y -= -ls.y * moveSpeed.y;
    }

    if (ls.x > 0 && ls) {
      groupRef.current.position.x += ls.x * moveSpeed.x;
    } else if (ls.x < 0) {
      groupRef.current.position.x -= -ls.x * moveSpeed.x;
    }

    // transfor reticleRef position with gamepad axes values
    if (rs.y > 0 && rs) {
      if (reticleRef.current.position.y < maxPlaneY) {
        reticleRef.current.position.y += rs.y * reticleSpeed.y;
      }
    } else if (rs.y < 0) {
      if (reticleRef.current.position.y > minPlaneY) {
        reticleRef.current.position.y -= -rs.y * reticleSpeed.y;
      }
    }

    if (rs.x > 0 && rs) {
      if (reticleRef.current.position.x < maxPlaneX) {
        reticleRef.current.position.x += rs.x * reticleSpeed.x;
      }
    } else if (rs.x < 0) {
      if (reticleRef.current.position.x > minPlaneX) {
        reticleRef.current.position.x -= -rs.x * reticleSpeed.x;
      }
    }

    // reticleRef should follow mouse position
    // clamp reticleRef to min/max x dimension of reticlePlaneRef
    // - when position is set on containing group, position of meshes remain unchanged ([0,0,0])
    // -- have to consider parent dimensions in calcuations
    // if (mouseVPX < minPlaneX + parentOffsetX) {
    //   reticleRef.current.position.x = minPlaneX;
    // } else if (mouseVPX > maxPlaneX + parentOffsetX) {
    //   reticleRef.current.position.x = maxPlaneX;
    // } else {
    //   reticleRef.current.position.x = mouseVPX - parentOffsetX;
    // }

    // reticleRef should follow mouse position
    // clamp reticleRef to min/max y dimension of reticlePlaneRef
    // if (mouseVPY < minPlaneY + parentOffsetY) {
    //   reticleRef.current.position.y = minPlaneY;
    // } else if (mouseVPY > maxPlaneY + parentOffsetY) {
    //   reticleRef.current.position.y = maxPlaneY;
    // } else {
    //   reticleRef.current.position.y = mouseVPY - parentOffsetY;
    // }

    // move groupRef to mouse position overtime if mouse position is outside bounds of reticlePlaneRef
    // if (mouseVPX < minPlaneX + parentOffsetX) {
    //   if (state.mouse.x < 0) {
    //     groupRef.current.position.x -= 0.03;
    //   } else {
    //     groupRef.current.position.x += 0.03;
    //   }
    // } else if (mouseVPX > maxPlaneX + parentOffsetX) {
    //   if (state.mouse.x < 0) {
    //     groupRef.current.position.x -= 0.03;
    //   } else {
    //     groupRef.current.position.x += 0.03;
    //   }
    // }

    // if (mouseVPY < minPlaneY + parentOffsetY) {
    //   if (state.mouse.y < 0) {
    //     groupRef.current.position.y -= 0.03;
    //   } else {
    //     groupRef.current.position.y += 0.03;
    //   }
    // } else if (mouseVPY > maxPlaneY + parentOffsetY) {
    //   if (state.mouse.y < 0) {
    //     groupRef.current.position.y -= 0.03;
    //   } else {
    //     groupRef.current.position.y += 0.03;
    //   }
    // }

    // reticleRef should move when the mouse moves
    // - in the direction the mouse moves
    // - clamp reticleRef to bounds of reticlePlaneRef
    // let mouseDelta = {
    //   x: 0,
    //   y: 0,
    // };
    // if (
    //   prevMouseState.x !== state.mouse.x &&
    //   prevMouseState.y !== state.mouse.y
    // ) {
    //   mouseDelta = {
    //     x: prevMouseState.current.x - state.mouse.x,
    //     y: prevMouseState.current.y - state.mouse.y,
    //   };
    // }

    // if (state.mouse.x <= -0.95) {
    //   // edge case reticle transform
    //   // - when mouse reaches edge of screen
    //   if (minPlaneX < reticleRef.current.position.x) {
    //     reticleRef.current.position.x -= reticleSpeed.x;
    //   }
    // } else if (state.mouse.x >= 0.95) {
    //   // edge case reticle transform
    //   // - when mouse reaches edge of screen
    //   if (maxPlaneX > reticleRef.current.position.x) {
    //     reticleRef.current.position.x += reticleSpeed.x;
    //   }
    // } else if (mouseDelta.x < 0) {
    //   // standard reticle transform
    //   if (maxPlaneX > reticleRef.current.position.x) {
    //     reticleRef.current.position.x += reticleSpeed.x;
    //   }
    // } else if (mouseDelta.x > 0) {
    //   // standard reticle transform
    //   if (minPlaneX < reticleRef.current.position.x) {
    //     reticleRef.current.position.x -= reticleSpeed.x;
    //   }
    // }

    // if (state.mouse.y <= -0.95) {
    //   // edge case reticle transform
    //   // - when mouse reaches edge of screen
    //   if (minPlaneY < reticleRef.current.position.y) {
    //     reticleRef.current.position.y -= reticleSpeed.y;
    //   }
    // } else if (state.mouse.y >= 0.95) {
    //   // edge case reticle transform
    //   // - when mouse reaches edge of screen
    //   if (maxPlaneY > reticleRef.current.position.y) {
    //     reticleRef.current.position.y += reticleSpeed.y;
    //   }
    // } else if (mouseDelta.y < 0) {
    //   // standard reticle transform
    //   if (maxPlaneY > reticleRef.current.position.y) {
    //     reticleRef.current.position.y += reticleSpeed.y;
    //   }
    // } else if (mouseDelta.y > 0) {
    //   // standard reticle transform
    //   if (minPlaneY < reticleRef.current.position.y) {
    //     reticleRef.current.position.y -= reticleSpeed.y;
    //   }
    // }
    // prevMouseState.current.x = state.mouse.x;
    // prevMouseState.current.y = state.mouse.y;

    //
    sparrowMeshRef.current.lookAt(reticleRef.current.position);
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
      <mesh
        ref={sparrowMeshRef}
        geometry={nodes.StarSparrow1.geometry}
        material={materials.StarSparrow_Yellow}
        scale={0.001}
        position={[0, 0, 10]}
        rotation={[0, Math.PI, 0]}
        // rotation={[-Math.PI / 2, Math.PI, 0]}
        // rotation={[-Math.PI / 2 + 1, Math.PI + 1, 0]}
      />
    </group>
  );
};

export default SpaceShipContoller2;
