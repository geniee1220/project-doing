import React from "react";
import styledComponent from "../Template.style";
import Header from "../../organisms/Header";
const { MainContainer, MainInner } = styledComponent;

interface MainTemplateProps {
  children?: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <MainContainer>
      <Header></Header>
      <MainInner>{children}</MainInner>
    </MainContainer>
  );
}

export default MainTemplate;
