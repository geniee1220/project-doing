import styled from "styled-components";

const GroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - var(--header-height) - var(--footer-height) - 500px);
  margin-top: 20px;
  padding-bottom: 36px;
`;

const GroupCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 56px;
`;

const styledComponent = {
  GroupContainer,
  GroupCardContainer,
};

export default styledComponent;
