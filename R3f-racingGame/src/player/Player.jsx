import React from "react";
import CharacterController from "./CharacterController";
import CharacterMesh from "./CharacterMesh";

const Player = () => {
  return (
    <CharacterController>
      <CharacterMesh />
    </CharacterController>
  );
};

export default Player;
