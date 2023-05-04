import React from "react";
import styledComponent from "./Button.style";
const { StyledButton } = styledComponent;

// 버튼에 들어갈 속성
export interface ButtonProps {
  children?: React.ReactNode;
  width: string;
  height: string;
  buttonType?: "primary" | "secondary" | "tertiary" | "default"; // 버튼 테마
  rounded?: boolean; // 버튼 둥글게 처리 여부 true or false
  color?: string; // 버튼 글씨 색상
  disabled?: boolean; // 비활성화 여부 true or false
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    param?: string
  ) => void; // 버튼 클릭 이벤트
  style?: React.CSSProperties;
}

function Button({
  children,
  buttonType,
  width,
  height,
  disabled,
  onClick,
  ...style
}: ButtonProps) {
  return (
    <StyledButton
      width={width}
      height={height}
      buttonType={buttonType}
      disabled={disabled}
      onClick={onClick}
      //   style={{ ...style }}
      {...style}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
