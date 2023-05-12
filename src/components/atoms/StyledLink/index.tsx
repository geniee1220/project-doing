import React from "react";
import StyledLink from "./StyledLink.style";

export interface StyledLinkCSSProps {
  type?: "button" | "link";
}

interface StyledLinkProps extends StyledLinkCSSProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  target: string;
}

function StyledLinkButton({ target, children, ...style }: StyledLinkProps) {
  return (
    <StyledLink to={target} {...style}>
      {children}
    </StyledLink>
  );
}

export default StyledLinkButton;
