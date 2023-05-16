import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 1px solid #d8d8d8;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 10px 16px;
  margin-bottom: 10px;
`;

const SearchBarInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  font-size: 18px;
  &::placeholder {
    color: #d8d8d8;
  }
`;

const SearchBarSubmitButton = styled.button`
  width: 36px;
  height: 36px;
`;

const SearchHistoryContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 21px;
  margin-bottom: 36px;
  padding-bottom: 2px;
`;

const SearchHistoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;

const SearchHistoryItem = styled.li`
  display: flex;
  width: fit-content;
  font-size: 14px;
`;

const ClearHistoryButton = styled.button`
  display: inline-block;
  padding-left: 15px;
  white-space: nowrap;
  font-size: 14px;
  margin-left: auto;
`;

const styledComponent = {
  SearchBarContainer,
  SearchBarInner,
  SearchBarInput,
  SearchBarSubmitButton,
  SearchHistoryContainer,
  SearchHistoryList,
  SearchHistoryItem,
  ClearHistoryButton,
};

export default styledComponent;
