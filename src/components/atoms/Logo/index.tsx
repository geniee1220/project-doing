import React from "react";
import LogoImg from "../../../assets/logo.svg";
import styledComponent from "./Logo.style";

const { LogoLink } = styledComponent;

function Logo() {
  return (
    <h1>
      <LogoLink to="/" aria-label="doing 로고">
        <img src={LogoImg} aria-hidden="true"></img>
      </LogoLink>
    </h1>
  );
}

export default React.memo(Logo);
