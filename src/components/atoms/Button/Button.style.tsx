import styled, { css } from "styled-components";
import { ButtonProps } from ".";

const handleButtonType = (props: ButtonProps) => {
  switch (props.buttonType) {
    case "primary":
      return css`
        background-color: ${(props) => props.theme.colors.primary};
        color: #fff;
      `;
    case "secondary":
      return css`
        background-color: ${(props) => props.theme.colors.secondary};
      `;
    case "outline":
      return css`
        border: 1px solid ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.primary};
      `;
    case `outline-black`:
      return css`
        border: 1px solid ${(props) => props.theme.colors.black};
        color: ${(props) => props.theme.colors.black};
      `;
    case `danger`:
      return css`
        background-color: ${(props) => props.theme.colors.red};
        color: #fff;
      `;
    case `danger-outline`:
      return css`
        border: 1px solid ${(props) => props.theme.colors.red};
        color: ${(props) => props.theme.colors.red};
      `;
    case "default":
      return css`
        background-color: ${(props) => props.theme.colors.black};
        color: #fff;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.width || "fit-content"};
  height: ${(props) => props.height || "36px"};
  font-size: 16px;
  border-radius: ${(props) => (props.rounded ? "4px" : null)};
  background-color: ${(props) => props.theme.colors.white};
  white-space: nowrap;
  appearance: none;
  border: 1px solid transparent;
  padding: 0 10px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  ${(props) => handleButtonType(props)}
`;

const styledComponent = { StyledButton };
export default styledComponent;
