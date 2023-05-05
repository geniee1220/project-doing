import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--footer-height);
  background-color: #000;
  color: #fff;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 1240px;
  //   margin:0 auto
  text-align: center;
  padding: 0 16px;
`;

const styledComponent = { FooterContainer, FooterInner };
export default styledComponent;
