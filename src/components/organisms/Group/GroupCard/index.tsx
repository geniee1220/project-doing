import React, { useState, useEffect } from "react";

// icons
import { IoArrowForward } from "react-icons/io5";

// Components
import StyledComponent from "./Card.style";
import { GroupModel } from "../../../../apis/groups";
import { SkeletonImage } from "../../../atoms/SkeletonImage";
import { Link, useLocation } from "react-router-dom";
import GroupLike from "../GroupLike";

const {
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
} = StyledComponent;

interface CardProps {
  data: GroupModel;
  children?: React.ReactNode;
}

function Card({ data, children }: CardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const path = `/studygroup/${data.id}`;
  const location = useLocation();

  const titleContent =
    data.group_type === "오프라인" ? (
      <>
        {data.group_region?.map((region: string) => `[${region}]`).join(" ")}{" "}
        {data.title}
      </>
    ) : data.group_type === "전체" ? (
      <>
        [온라인]{" "}
        {data.group_region?.map((region: string) => `[${region}]`).join(" ")}{" "}
        {data.title}
      </>
    ) : (
      `[온라인] ${data.title}`
    );

  // 이미지 로딩 완료 시, 로딩 상태 변경
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <CardContainer
        className={data.members.length + 1 == data.member_count ? "closed" : ""}
      >
        {/* 스켈레톤 이미지 - 로딩 후 이미지가 깜박거리는 것 방지  */}
        {data.imgUrl !== "" && isLoading && <SkeletonImage />}

        {/* 이미지 있을 경우 이미지 컴포넌트 노출  */}
        {data.imgUrl && (
          <GroupCardImage
            src={data.imgUrl}
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        )}

        <CardInner>
          <CardTitle>
            {/* 좋아요  */}
            <GroupLike docId={data.id}></GroupLike>

            {/* 타이틀 */}
            {path !== location.pathname ? (
              <Link to={`/studygroup/${data.id}`}>{titleContent}</Link>
            ) : (
              <p>{titleContent}</p>
            )}
          </CardTitle>

          {/* 모집 현황 */}
          <CardRecruitmentStatus>
            <span style={{ marginRight: "30px" }}>모집현황</span>
            {data.members.length + 1}명&nbsp;/&nbsp;{data.member_count}명
          </CardRecruitmentStatus>

          {/* 내용 */}
          <CardContent>{data.description}</CardContent>

          {/* 태그 */}
          <TagContainer>
            {data.tag.map((tag: string, index: number) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagContainer>
        </CardInner>

        {/* 자세히 보기 버튼 */}
        {path !== location.pathname && (
          <DetailLink to={`/studygroup/${data.id}`}>
            <span>자세히 보기</span>
            <IoArrowForward style={{ marginLeft: "5px" }} />
          </DetailLink>
        )}

        {/* 모집 마감 레이어*/}
        {data.members.length + 1 == data.member_count && <ClosedLayer />}
      </CardContainer>
    </>
  );
}

export default Card;
