import React, { useState, forwardRef } from "react";
import styledComponent from "../Input.style";
import { useForm } from "react-hook-form";

const {
  InputContainer,
  InputLabel,
  StyledCheckboxContainer,
  StyledCheckBox,
  StyledInputCheckbox,
  InputErrorMessage,
} = styledComponent;

interface OptionProps {
  id: string;
  text: string;
}

interface RadioProps {
  name: string;
  label?: string;
  options: OptionProps[];
  errors: any;
}

function CheckboxGroup(
  { name, label, options, errors, ...rest }: RadioProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [currentOption, setCurrentOption] = useState(0);

  const handleOptionClick = (index: number) => () => {
    setCurrentOption(index);
  };

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <StyledCheckboxContainer>
        {options.map(({ text }, index) => (
          <StyledCheckBox key={text}>
            <StyledInputCheckbox
              type="checkbox"
              id={`${name}-${index}`}
              name={name}
              value={text}
              ref={ref}
              onClick={handleOptionClick(index)}
              {...rest}
            ></StyledInputCheckbox>

            <label htmlFor={`${name}-${index}`}>{text}</label>
          </StyledCheckBox>
        ))}
      </StyledCheckboxContainer>

      {errors[name] && (
        <InputErrorMessage>{errors[name].message}</InputErrorMessage>
      )}
    </InputContainer>
  );
}

export default forwardRef(CheckboxGroup);
