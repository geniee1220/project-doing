import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
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
  padding: 0 16px;
  margin: 0 auto;
`;

const HeaderRightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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
  NavigationList,
  NavigationItem,
};

export default styledComponent;
