import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { StyledLinkCSSProps } from ".";

const StyledLink = styled(Link)<StyledLinkCSSProps>`
  font-size: 14px;

  ${(props) =>
    props.type === "button" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 36px;
      padding: 0 10px;
      border-radius: 4px;
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
      border: none;
    `}
`;

export default StyledLink;
