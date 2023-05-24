import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  top: 0;
  left: 0;
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

  @media (max-width: 768px) {
    display: none;
    position: absolute;
    top: calc(100% + 1px);
    right: 0;
    flex-direction: column;
    background-color: #fff;
    padding: 20px 16px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;

    &.active {
      display: flex;
    }
  }
`;

const NavigationItem = styled(Link)`
  margin-right: 38px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const MobileNavButton = styled.button`
  display: none;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 360px) {
    margin-left: 15px;
  }
`;

const styledComponent = {
  HeaderContainer,
  HeaderInner,
  HeaderRightMenu,
  NavigationList,
  NavigationItem,
  MobileNavButton,
};

export default styledComponent;
