import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px 22px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 4px;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }

  &.closed {
    img {
      filter: grayscale(100%);
      opacity: 0.3;
    }

    color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
  }
`;

const GroupCardImage = styled.img`
  width: 100%;
  max-width: 700px;
  height: 160px;

  object-fit: cover;
`;

const CardInner = styled.div`
  ${GroupCardImage} + & {
    margin-top: 20px;
  }
`;

const CardTitle = styled.div`
  display: inline-flex;
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const CardRecruitmentStatus = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`;

const CardContent = styled.div`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 18px;
  height: 54px;
  color: #878787;
  font-size: 13px;
  text-decoration: none;

  ${CardContainer}.closed & {
    color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0 8px;
  margin-top: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};

  ${CardContainer}.closed & {
    border: 1px solid ${(props) => props.theme.colors.gray};
    background-color: #fcfcfc;
    color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
  }
`;

const ClosedLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  pointer-events: none;
`;

const DetailLink = styled(Link)`
  display: inline-flex;
  margin-left: auto;
  margin-top: 4px;
  font-size: 14px;
`;

const styledComponent = {
  CardContainer,
  GroupCardImage,
  CardInner,
  CardTitle,
  CardRecruitmentStatus,
  CardContent,
  TagContainer,
  Tag,
  ClosedLayer,
  DetailLink,
};

export default styledComponent;
