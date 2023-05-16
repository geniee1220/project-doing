import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../../atoms/userState";
import { auth } from "../../../../firebase";

import styledComponent from "./Header.style";
import Button from "../../atoms/Button";
import Logo from "../../atoms/Logo";
const {
  HeaderContainer,
  HeaderInner,
  HeaderRightMenu,
  NavigationList,
  NavigationItem,
} = styledComponent;

function Header() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticatedState] =
    useRecoilState(isAuthenticatedState);

  const routeChange = (routePath: string) => {
    navigate(`/${routePath}`);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticatedState(false);
      localStorage.setItem("isAuthenticated", "false");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 로컬 스토리지의 isAuthenticated 값이 true이면, isAuthenticatedState를 true로 변경
    if (localStorage.getItem("isAuthenticated") === "true") {
      setIsAuthenticatedState(true);
    }
  }, [isAuthenticated]);

  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고 */}
        <Logo />

        {/* 내비게이션 링크  */}
        <NavigationList>
          <NavigationItem to="/studygroup">스터디그룹</NavigationItem>
          <NavigationItem to="/lounge/my">마이라운지</NavigationItem>
        </NavigationList>

        <HeaderRightMenu>
          {isAuthenticated ? (
            <Button
              width="fit-content"
              height="38px"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                width="fit-content"
                height="38px"
                onClick={() => routeChange("login")}
              >
                Login
              </Button>
              <Button
                width="115px"
                height="38px"
                style={{ border: "1px solid black", marginLeft: "20px" }}
                onClick={() => routeChange("register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </HeaderRightMenu>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
