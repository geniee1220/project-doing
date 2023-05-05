import styled from "styled-components";
import { MainTemplateCSSProps } from "./MainTemplate.tsx";

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh);
`;

const PageTitle = styled.p`
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  font-weight: 500;
`;

const MainInner = styled.main<MainTemplateCSSProps>`
  max-width: 1240px;
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));

  ${(props) =>
    props.pageName === "register" || props.pageName === "login"
      ? `padding-top: 140px;`
      : `padding-top: 0;`}
`;

const MainContents = styled.div<MainTemplateCSSProps>`
  width: 100%;
  max-width: ${(props) => props.contentsWidth || "100%"};
  margin: 0 auto;
`;

const styledComponent = { MainContainer, PageTitle, MainInner, MainContents };

export default styledComponent;
