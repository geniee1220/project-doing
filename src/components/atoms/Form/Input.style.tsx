import styled, { css } from "styled-components";
import { InputCSSProps } from "./Input";

const InputContainer = styled.div<InputCSSProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.width || "100%"};
  margin-bottom: 18px;
`;

const InputLabel = styled.label<InputCSSProps>`
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

const commonInputStyle = css<InputCSSProps>`
  width: 100%;
  border: 0;

  ${(props) =>
    props.focusStyle &&
    css`
      :focus-within {
        border: 1px solid ${(props) => props.theme.colors.primary};
      }
    `}

  ${InputContainer}:not(.search) & {
    border-radius: 4px;
    border: 1px solid #d8d8d8;

    &.error {
      border: 1px solid ${(props) => props.theme.colors.red};
    }
  }
`;

const InputDescription = styled.p`
  font-size: 14px;
  margin-top: -4px;
  margin-bottom: 5px;
`;

const StyledInput = styled.input<InputCSSProps>`
  ${commonInputStyle}
  padding: 10px;
  max-width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "36px"};
`;

const StyledTextarea = styled.textarea<InputCSSProps>`
  ${commonInputStyle}
  height: ${(props) => props.height || "180px"};
  padding: 10px;
  resize: none;
  overflow-y: scroll;
  overflow-y: overlay;

  ::placeholder {
    white-space: pre-wrap;
  }
`;

// 체크박스
const StyledCheckboxContainer = styled.div<InputCSSProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 326px;
  gap: 10px 22px;
`;

const StyledCheckBox = styled.div``;
const StyledInputCheckbox = styled.input`
  display: none;

  & + label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94px;
    height: 40px;
    background-color: #f8f8f9;
    border-radius: 4px;
  }

  &:checked + label {
    border: 1px solid ${(props) => props.theme.colors.primary};
    background-color: #c9e5ff;
  }
`;
const StyledInputCheckboxIcon = styled.div``;

// 라디오 버튼
const StyledRadioContainer = styled.div`
  display: flex;
  align-checkbox: center;
`;

const StyledRadioBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledInputRadio = styled.input`
  display: none;

  & + label {
    display: inline-flex;
    align-items: center;
  }

  &:checked + label span {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z' fill='rgba(3,126,243,1)'%3E%3C/path%3E%3C/svg%3E");
  }
`;

const StyledInputRadioIcon = styled.span<InputCSSProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: -2px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z' fill='rgba(216,216,216,1)'%3E%3C/path%3E%3C/svg%3E");
  margin-right: 8px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

// 기타 입력(인풋 단위)
const InputUnit = styled.span`
  font-size: 14px;
  margin-left: 4px;
`;

const InputErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.red};
`;

const styledComponent = {
  InputContainer,
  InputLabel,
  InputDescription,
  StyledInput,
  StyledRadioContainer,
  StyledRadioBox,
  StyledInputRadio,
  StyledInputRadioIcon,
  StyledCheckboxContainer,
  StyledCheckBox,
  StyledInputCheckbox,
  StyledInputCheckboxIcon,
  StyledTextarea,
  InputUnit,
  InputErrorMessage,
};
export default styledComponent;
