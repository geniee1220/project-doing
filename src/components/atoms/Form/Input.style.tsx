import styled, { css } from "styled-components";
import { InputCSSProps } from "./Input";

const InputContainer = styled.div<InputCSSProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  margin-bottom: 18px;
`;

const InputLabel = styled.label`
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

const commonInputStyle = css`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  text-indent: 10px;
  :focus-within {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  &.error {
    border: 1px solid ${(props) => props.theme.colors.red};
  }
`;

const StyledInput = styled.input<InputCSSProps>`
  ${commonInputStyle}
  height: ${(props) => props.height || "36px"};
`;

const StyledTextarea = styled.textarea`
  ${commonInputStyle}
  height: 180px;
  padding: 10px 0;
  resize: none;
  overflow-y: scroll;
  overflow-y: overlay;
`;

const InputErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.red};
`;

const styledComponent = {
  InputContainer,
  InputLabel,
  StyledInput,
  StyledTextarea,
  InputErrorMessage,
};
export default styledComponent;
