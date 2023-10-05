import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas camera={{ position: [1, 1.5, 2.5], fov: 50 }} shadows>
      <App />
    </Canvas>
  </React.StrictMode>
);
