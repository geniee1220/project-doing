import React from "react";
import LogoImg from "../../../assets/logo.svg";
import styledComponent from "./Logo.style";

const { LogoLink } = styledComponent;

function Logo() {
  return (
    <h1 aria-label="doing 로고">
      <LogoLink to="/">
        <img src={LogoImg} aria-hidden="true"></img>
      </LogoLink>
    </h1>
  );
}

export default React.memo(Logo);
