import React from "react";
import styledComponent from "../Input.style";
import { forwardRef } from "react";

const {
  InputContainer,
  InputLabel,
  InputDescription,
  StyledInput,
  InputUnit,
  InputErrorMessage,
} = styledComponent;

export interface InputCSSProps {
  width?: string;
  height?: string;
  direction?: string; // column:default, row
  inputDescription?: string; // input 설명
  ContainerClassName?: "search" | "";
  focusStyle?: boolean;
}
interface InputProps extends InputCSSProps {
  type?: string; // text:default, password, number, email, tel, url, search
  name?: string; // label 그룹 이름
  placeholder?: string;
  label?: string; // input 이름
  inputUnit?: string; // input 단위
  errors?: any;
}

function Input(
  {
    width,
    height,
    direction,
    type,
    name,
    label,
    inputUnit,
    inputDescription,
    placeholder,
    errors,
    ContainerClassName,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <InputContainer direction={direction} className={ContainerClassName}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      {inputDescription && (
        <InputDescription>{inputDescription}</InputDescription>
      )}
      <div>
        <StyledInput
          type={type}
          id={name}
          name={name}
          className={errorKEY && "error"}
          width={width}
          height={height}
          ref={ref}
          placeholder={placeholder}
          spellCheck="false"
          {...rest}
        />
        {inputUnit && <InputUnit>{inputUnit}</InputUnit>}
      </div>
      {errorKEY && <InputErrorMessage>{errorKEY}</InputErrorMessage>}
    </InputContainer>
  );
}

export default forwardRef(Input);
