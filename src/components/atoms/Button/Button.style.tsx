import styled, { css } from "styled-components";
import { ButtonProps } from ".";

// const selectedBgColor = selectedColor ? theme.bg[selectedColor] : "transparent";

const handleButtonType = (props: ButtonProps) => {
  switch (props.buttonType) {
    case "primary":
      return css`
        background-color: ${(props) => props.theme.colors.primary};
      `;
    case "secondary":
      return css`
        background-color: ${(props) => props.theme.colors.secondary};
      `;
    case "tertiary":
      return css`
        background-color: ${(props) => props.theme.colors.tertiary};
      `;
    case "default":
      return css`
        background-color: ${(props) => props.theme.colors.black};
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: ${(props) => (props.rounded ? "16px" : null)};
  background-color: ${(props) => props.theme.colors.white};
  white-space: nowrap;
  appearance: none;
  border: 1px solid transparent;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  ${(props) => handleButtonType(props)}
`;

const styledComponent = { StyledButton };
export default styledComponent;
