import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoLink = styled(Link)`
  display: flex;
  width: 81px;
  height: 35px;
  margin-right: 52px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-right: 36px;
  }

  @media (max-width: 480px) {
    margin-right: 24px;
  }
`;

const styledComponent = { LogoLink };
export default styledComponent;
