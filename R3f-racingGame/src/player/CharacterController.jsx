import { KeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const CharacterController = ({ children }) => {
  return (
    <KeyboardControls
      map={[
        { name: "up", keys: ["KeyW"] },
        { name: "down", keys: ["KeyS"] },
        { name: "left", keys: ["KeyA"] },
        { name: "right", keys: ["KeyD"] },
      ]}
    >
      {children}
    </KeyboardControls>
  );
};

export default CharacterController;
