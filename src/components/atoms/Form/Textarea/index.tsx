import React from "react";
import styledComponent from "../Input.style";
import { forwardRef, InputHTMLAttributes } from "react";

const { InputContainer, InputLabel, StyledTextarea, InputErrorMessage } =
  styledComponent;

export interface InputCSSProps {
  width?: string;
  height?: string;
  direction?: string; // column:default, row
}
interface InputProps extends InputCSSProps {
  name?: string;
  label?: string;
  placeholder?: string;
  errors?: any;
  style?: React.CSSProperties;
}

function Textarea(
  {
    width,
    height,
    direction,
    name,
    label,
    errors,
    placeholder,
    style,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <InputContainer width={width} direction={direction} style={style}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledTextarea
        id={name}
        name={name}
        height={height}
        className={errorKEY && "error"}
        placeholder={placeholder}
        spellCheck="false"
        ref={ref}
        {...rest}
      />
      {errorKEY && <InputErrorMessage>{errorKEY}</InputErrorMessage>}
    </InputContainer>
  );
}

export default forwardRef(Textarea);
