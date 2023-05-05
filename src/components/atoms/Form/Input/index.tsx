import React from "react";
import styledComponent from "../Input.style";
import { forwardRef } from "react";

const { InputContainer, InputLabel, StyledInput, InputErrorMessage } =
  styledComponent;

export interface InputCSSProps {
  width?: string;
  height?: string;
  direction?: string; // column:default, row
}
interface InputProps extends InputCSSProps {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  errors?: any;
}

function Input(
  {
    width,
    height,
    placeholder,
    direction,
    type,
    name,
    label,
    errors,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <InputContainer width={width} direction={direction}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput
        id={name}
        name={name}
        className={errorKEY && "error"}
        height={height}
        type={type}
        ref={ref}
        placeholder={placeholder}
        {...rest}
      />
      {errorKEY && <InputErrorMessage>{errorKEY}</InputErrorMessage>}
    </InputContainer>
  );
}

export default forwardRef(Input);
