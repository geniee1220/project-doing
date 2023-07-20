import styled, { css } from "styled-components";
import { MainTemplateCSSProps } from "./MainTemplate.tsx";
import { SectionTemplateCSSProps } from "./SectionTemplate.tsx";

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
  padding: 0 16px;
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));

  ${(props) => {
    switch (props.pageName) {
      case "register":
      case "login":
        return `padding-top: 140px;`;
      case "studyGroup":
      case "myLounge":
        return `padding-top: 48px;`;
      default:
        return `padding-top: 32px;`;
    }
  }}
`;

const MainContents = styled.div<MainTemplateCSSProps>`
  width: 100%;
  max-width: ${(props) => props.contentsWidth || "100%"};
  margin: 0 auto;
`;

const SectionContainer = styled.section<SectionTemplateCSSProps>`
  position: relative;
  width: 100%;
  max-width: ${(props) => props.contentsWidth || "100%"};
  margin: 0 auto;

  ${({ border }) =>
    border &&
    css`
      padding: 25px 18px;
      border: 1px solid ${(props) => props.theme.colors.gray};
      border-radius: 4px;
    `};
`;

const TitleDecoration = styled.div`
  width: 48px;
  height: 7px;
  background-color: ${(props) => props.theme.colors.primary};
  margin-bottom: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  padding-bottom: 2px;
  border-bottom: 2px solid #000;
`;

const SectionLabel = styled.p`
  position: relative;
  margin-bottom: 16px;
  font-size: 21px;
  font-weight: 500;
`;

const SectionInner = styled.div`
  width: 100%;
  min-height: 300px;
`;

const LoadButton = styled.button`
  width: 100%px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const styledComponent = {
  MainContainer,
  PageTitle,
  MainInner,
  MainContents,
  SectionContainer,
  SectionHeader,
  TitleDecoration,
  SectionLabel,
  SectionInner,
  LoadButton,
};

export default styledComponent;
