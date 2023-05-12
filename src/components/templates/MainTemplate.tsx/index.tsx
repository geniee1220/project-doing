import React from "react";
import Header from "../../organisms/Header";

import styledComponent from "../Template.style";
const { MainContainer, PageTitle, MainInner, MainContents } = styledComponent;

import Footer from "../../organisms/Footer";

export interface MainTemplateCSSProps {
  pageName?: string;
  contentsWidth?: string;
}
interface MainTemplateProps extends MainTemplateCSSProps {
  pageTitle?: string;
  children?: React.ReactNode;
}

function MainTemplate({
  pageName,
  pageTitle,
  children,
  contentsWidth,
}: MainTemplateProps) {
  return (
    <MainContainer>
      <Header></Header>
      <MainInner pageName={pageName}>
        {pageName == "login" ||
          (pageName == "register" && <PageTitle>{pageTitle}</PageTitle>)}
        <MainContents contentsWidth={contentsWidth}>{children}</MainContents>
      </MainInner>
      <Footer></Footer>
    </MainContainer>
  );
}

export default MainTemplate;
