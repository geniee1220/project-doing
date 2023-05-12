import React, { useState, forwardRef } from "react";
import styledComponent from "../Input.style";

const {
  InputContainer,
  InputLabel,
  StyledRadioContainer,
  StyledRadioBox,
  StyledInputRadio,
  StyledInputRadioIcon,
  InputErrorMessage,
} = styledComponent;

interface OptionProps {
  text: string;
  checked?: boolean;
}

interface RadioProps {
  name: string;
  label: string;
  options: OptionProps[];
  errors: any;
}

function Radio(
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
      <StyledRadioContainer>
        {options.map(({ text }, index) => (
          <StyledRadioBox key={text}>
            <StyledInputRadio
              type="radio"
              id={`${name}-${index}`}
              name={name}
              value={text}
              ref={ref}
              checked={currentOption === index}
              onClick={handleOptionClick(index)}
              {...rest}
            ></StyledInputRadio>
            <label htmlFor={`${name}-${index}`}>
              <StyledInputRadioIcon></StyledInputRadioIcon>
              {text}
            </label>
          </StyledRadioBox>
        ))}
      </StyledRadioContainer>

      {errors[name] && (
        <InputErrorMessage>{errors[name].message}</InputErrorMessage>
      )}
    </InputContainer>
  );
}

export default forwardRef(Radio);
