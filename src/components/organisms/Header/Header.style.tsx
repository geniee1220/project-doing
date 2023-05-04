import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  display: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  border-bottom: 1px solid #e5e5e5;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const HeaderRightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const LogoLink = styled(Link)`
  display: flex;
  margin-right: 52px;
`;

const NavigationList = styled.nav`
  display: flex;
  align-items: center;
`;

const NavigationItem = styled(Link)`
  margin-right: 38px;

  &:last-child {
    margin-right: 0;
  }
`;

const styledComponent = {
  HeaderContainer,
  HeaderInner,
  HeaderRightMenu,
  LogoLink,
  NavigationList,
  NavigationItem,
};

export default styledComponent;
