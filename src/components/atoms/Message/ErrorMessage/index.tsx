import React from "react";
import StyledErrorMessage from "./ErrorMessage.style";

interface ErrorMessageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function ErrorMessage({ children, ...style }: ErrorMessageProps) {
  return <StyledErrorMessage {...style}>{children}</StyledErrorMessage>;
}

export default ErrorMessage;
