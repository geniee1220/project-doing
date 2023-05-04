import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh);
`;

const MainInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height));
`;

const styledComponent = { MainContainer, MainInner };

export default styledComponent;
