import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;

  ul {
    display: inline-flex;
    align-items: center;
  }

  li {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 3px;
    margin-right: 10px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 14px;
      padding: 5px 10px;
      text-decoration: none;
      cursor: pointer;

      &.selected {
        background-color: #333;
        color: #fff;
      }
    }

    &.pageLabelBtn {
      width: fit-content;
      &.disabled {
        color: #999;
        pointer-events: none;
        cursor: default;
      }
    }

    &.active,
    &:hover {
      background-color: #333;
      color: #fff;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

const StyledComponent = {
  PaginationContainer,
};

export default StyledComponent;
