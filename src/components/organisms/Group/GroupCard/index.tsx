import React, { useState } from "react";

// icons
import { IoArrowForward } from "react-icons/io5";

// Components
import StyledComponent from "./Card.style";
import { PostModel } from "../../../../apis/posts";
import { SkeletonImage } from "../../../atoms/SkeletonImage";
import { Link } from "react-router-dom";
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
  data: PostModel;
  children?: React.ReactNode;
}

function Card({ data, children }: CardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // console.log(data);

  // // 폼 클릭시 날짜 가공 함수
  // const createDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear().toString();
  //   const month = (today.getMonth() + 1).toString();
  //   const date = today.getDate().toString().padStart(2, "0");
  //   const hour = today.getHours().toString().padStart(2, "0");
  //   const minute = today.getMinutes().toString().padStart(2, "0");
  //   return `${year}. ${month}. ${date} ${hour}:${minute}`;
  // };
  return (
    <>
      <CardContainer
        className={
          data.members.length + 1 === data.member_count ? "closed" : ""
        }
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
            <GroupLike docId={data.id}></GroupLike>
            <Link to={`/study-group/${data.id}`}>
              {/* 지역 & 타이틀 */}
              {data.group_type !== "온라인" ? (
                <>
                  {data.group_region
                    ?.map((region: string) => `[${region}]`)
                    .join(" ")}{" "}
                  {data.title}
                </>
              ) : (
                `[온라인] ${data.title}`
              )}
            </Link>
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
        <DetailLink to={`/study-group/${data.id}`}>
          <span>자세히 보기</span>
          <IoArrowForward style={{ marginLeft: "5px" }} />
        </DetailLink>

        {/* 모집 마감 레이어*/}
        {data.members.length + 1 === data.member_count && <ClosedLayer />}
      </CardContainer>
    </>
  );
}

export default Card;
