import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./helpers/Lights";
import DevScene from "./scenes/DevScene";
import Player from "./player/Player";

const App = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <axesHelper position={[0, 0, 0]} args={[2]} />
      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={2}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />

      <Lights />
      <DevScene>
        <Player />
      </DevScene>
    </>
  );
};

export default App;
