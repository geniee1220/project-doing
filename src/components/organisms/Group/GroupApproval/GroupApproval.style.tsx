import styled from "styled-components";

const GroupApprovalContainer = styled.div`
  margin-bottom: 100px;
`;

const GroupApprovalHeader = styled.div`
  position: relative;
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 500;
`;

const GroupApprovalList = styled.ul``;
const GroupApprovalItem = styled.li`
  display: flex;
`;

const GroupApprovalItemLabel = styled.p`
  min-width: 120px;
  margin-right: 18px;
`;

const GroupApprovalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);
  max-width: 820px;
`;
const GroupApprovalInfo = styled.p`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  white-space: nowrap;
  color: #878787;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const GroupApprovalItemButtonContainer = styled.div`
  display: flex;
  gap: 0 18px;
`;
const GroupApprovalItemButton = styled.button``;

const styledComponent = {
  GroupApprovalContainer,
  GroupApprovalHeader,
  GroupApprovalList,
  GroupApprovalItem,
  GroupApprovalInfoContainer,
  GroupApprovalInfo,
  GroupApprovalItemLabel,
  GroupApprovalItemButtonContainer,
  GroupApprovalItemButton,
};

export default styledComponent;
