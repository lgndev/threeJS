import { useGLTF } from "@react-three/drei";

const Fox = () => {
  const model = useGLTF("./Fox/glTF/Fox.gltf");
  return <primitive object={model.scene} scale={0.05} />;
};

export default Fox;
