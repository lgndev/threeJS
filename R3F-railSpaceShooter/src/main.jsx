import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: "up", keys: ["KeyW"] },
        { name: "down", keys: ["KeyS"] },
        { name: "left", keys: ["KeyA"] },
        { name: "right", keys: ["KeyD"] },
      ]}
    >
      <Canvas shadows style={{ backgroundColor: "black" }}>
        <App />
      </Canvas>
    </KeyboardControls>
  </React.StrictMode>
);
