import React from "react";
import styledComponent from "./Footer.style";

const { FooterContainer, FooterInner } = styledComponent;

function Footer() {
  return (
    <FooterContainer>
      <FooterInner>© 2023. Project Doing. all rights reserved.</FooterInner>
    </FooterContainer>
  );
}

export default Footer;
