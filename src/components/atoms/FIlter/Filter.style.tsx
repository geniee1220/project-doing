import styled from "styled-components";

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 130px;
  height: 30px;
  //   border-right: 1px solid #e5e5e5;
  border-right: 1px solid #000;
  margin-right: 10px;
`;

const SelectedItem = styled.div`
  width: 100%;
`;
const SelectedItemLabel = styled.span`
  display: flex;
  padding-left: 5px;
  cursor: pointer;
`;

const FilterList = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: fit-content;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px;
`;

const FilterItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 15px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const styledComponent = {
  FilterContainer,
  SelectedItem,
  SelectedItemLabel,
  FilterList,
  FilterItem,
};

export default styledComponent;
