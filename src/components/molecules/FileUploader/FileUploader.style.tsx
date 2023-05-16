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

const FileFunctionContainer = styled.div`
  display: flex;
  aign-items: center;
  max-width: 700px;
  gap: 0 10px;
`;
const FileUploaderLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 4px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  padding: 5px 10px;
`;

const FileDeleteButton = styled.button`
  font-size: 14px;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
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
  FileFunctionContainer,
  FileDeleteButton,
  FileUploaderLabel,
  FileDropZone,
};

export default styledComponent;
