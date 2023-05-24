import { useState } from "react";
import MainTemplate from "../components/templates/MainTemplate.tsx";
import CarouselSlide from "../components/organisms/Carousel/index.tsx";
import SectionTemplate from "../components/templates/SectionTemplate.tsx/index.tsx";

import styledComponent from "../components/templates/Template.style";

import StyledLink from "../components/atoms/StyledLink/StyledLink.style.tsx";
import { GroupModel, useGroups } from "../apis/groups/index.tsx";
import Card from "../components/organisms/Group/GroupCard/index.tsx";
import Loader from "../components/atoms/Loader/index.tsx";

const { SectionHeader, SectionLabel } = styledComponent;

// 캐러셀 옵션 및 아이템
const carouselOptions = {
  interval: 8000,
  showThumbs: false,
  useKeyboardArrows: true,
  showStatus: false,
  showArrows: false,
  showIndicators: false,
};

const carouselItem = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/project-doing-feb9d.appspot.com/o/images%2Fdoing%2Fmain_banner1.png?alt=media&token=42b43264-fb41-4eae-b318-6650d6b7042b",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/project-doing-feb9d.appspot.com/o/images%2Fdoing%2Fmain_banner2.png?alt=media&token=4a3fe15a-d00e-4a2e-bbd8-427ca6b19889",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/project-doing-feb9d.appspot.com/o/images%2Fdoing%2Fmain_banner3.png?alt=media&token=632a62d7-009a-43e7-8fe9-0da7faaaf3c6",
  },
];

function Home() {
  const { data: groups, isLoading } = useGroups();
  // const groupList = groups?.slice(0, 3);
  const groupList = groups
    ?.filter((group) => group.members.length + 1 !== group.member_count)
    .slice(0, 3);

  // 모든 그룹의 태그 배열
  const groupTag = groups?.map((group: GroupModel) => group.tag);
  const tagList = groupTag?.reduce((acc: string[], cur: string[]) => {
    return acc.concat(cur);
  }, []);
  const sliceTagList = [...new Set(tagList?.slice(0, 20))];

  // 태그의 이름과 개수를 담은 배열
  const tagCount = tagList?.reduce((acc: any, cur: string) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  // 랜덤 셔플 함수 정의(태그 랜덤 정렬 : UI)
  // Fisher-Yates shuffle 알고리즘
  const shuffle = (array: any[]): any[] => {
    let currentIndex = array.length;
    let tempValue: any;
    let randomIndex: number;

    // 아직 섞어야할 요소가 남아있다면
    while (0 !== currentIndex) {
      // 남은 요소들 중 랜덤한 인덱스 선택
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // 현재 요소와 랜덤 선택한 요소 교환
      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  };

  // 태그 배열을 랜덤 셔플
  const shuffleTagList = shuffle(sliceTagList);

  // 태그 카운트를 내림차순으로 정렬하면 태그의 개수가 많은 순서대로 정렬된다.
  let popularTag: string[] = [];

  if (tagCount) {
    const sortedTagCount = Object.entries(tagCount).sort(
      (a: any, b: any) => b[1] - a[1]
    );
    popularTag = sortedTagCount.slice(0, 3).map((item) => item[0]);
  } else {
    popularTag = [];
  }

  const [isPageloading, setIsPageloading] = useState(true);

  return (
    <MainTemplate contentsWidth="1200px">
      <CarouselSlide
        carouselItem={carouselItem}
        carouselOptions={carouselOptions}
        style={{
          marginBottom: "20px",
        }}
      />

      <SectionTemplate contentsWidth="940px" style={{ marginBottom: "58px" }}>
        {/* 헤더 */}
        <SectionHeader>
          <SectionLabel style={{ marginBottom: "0" }}>
            최신 프로젝트
          </SectionLabel>

          <StyledLink to="/studygroup" style={{ marginLeft: "auto" }}>
            전체보기
          </StyledLink>
        </SectionHeader>
        {!isLoading && Array.isArray(groupList) && groupList.length > 0 ? (
          groupList?.map((group: GroupModel) => (
            <Card key={group.id} data={group}></Card>
          ))
        ) : (
          <Loader />
        )}
      </SectionTemplate>

      <SectionTemplate contentsWidth="940px" style={{ marginBottom: "58px" }}>
        {/* 헤더 */}
        <SectionHeader>
          <SectionLabel style={{ marginBottom: "0" }}>
            태그로 스터디그룹 한 눈에 보기{" "}
          </SectionLabel>
        </SectionHeader>

        <div
          style={{
            display: "flex",
            maxWidth: "810px",
            flexWrap: "wrap",
            gap: "13px 20px",
          }}
        >
          {shuffleTagList?.map((tag: string) => (
            <StyledLink
              to={`/studygroup?tag=${tag}`}
              style={{ fontSize: "16px" }}
              key={tag}
            >
              {popularTag.includes(tag) ? (
                <span style={{ fontWeight: "bold" }}>{tag}</span>
              ) : (
                <span>{tag}</span>
              )}
            </StyledLink>
          ))}
        </div>
      </SectionTemplate>
    </MainTemplate>
  );
}

export default Home;
