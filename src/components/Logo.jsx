import React from "react";
import logo from "../assets/ScriptAidLogo.png";

export function Logo(props) {
  const size = props.size || 80;

  return (
    <img
      src={logo}
      alt="ScriptAid Logo"
      style={{
        height: `${size}px`,
        width: "auto",
      }}
    />
  );
}
