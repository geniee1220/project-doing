import styled from "styled-components";

const FileUploaderContainer = styled.div`
  margin-bottom: 24px;

  &.loading {
    pointer-events: none;

    div {
      background-color: #f6f6f6;
      color: ${(props) => props.theme.colors.gray};
    }
  }
`;

const FileUploadInput = styled.input`
  display: none;
`;

const FileDropZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  height: 160px;
  margin-bottom: 4px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 4px;
  background-color: #f1f8fe;
  img {
    width: 100%;
    max-height: 100%;
    background-size: cover;
  }

  .dragIcon {
    width: 24px;
    height: 24px;
    margin-right: 7px;
  }

  &.hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const styledComponent = {
  FileUploaderContainer,
  FileUploadInput,
  FileDropZone,
};

export default styledComponent;
