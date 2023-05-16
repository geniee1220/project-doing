import styled from "styled-components";

const CommentContainer = styled.div`
  margin-top: 80px;
`;

const CommentHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  padding-bottom: 5px;
  span {
    font-weight: bold;
  }
`;

const CommentInner = styled.div``;

const CommentContentsContainer = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 17px 8px;
  border-bottom: 1px solid #f4f4f4;
`;

const CommentContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CommentUsername = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const CommentDate = styled.span`
  margin-left: auto;
  color: #bcbcbc;
  font-size: 13px;
`;

const CommentContent = styled.p`
  font-size: 14px;
`;

const CommentEditorContainer = styled.div`
  margin-top: 10px;
`;

const styledComponent = {
  CommentContainer,
  CommentHeader,
  CommentInner,
  CommentContentsContainer,
  CommentContentsWrapper,
  CommentUsername,
  CommentContent,
  CommentDate,
  CommentEditorContainer,
};

export default styledComponent;
