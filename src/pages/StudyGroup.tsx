import React, { useState, useEffect, useContext } from "react";

// react router
import { useNavigate } from "react-router";

// firebase post
import { useGroups } from "../apis/groups/index.tsx";
import { GroupModel } from "../apis/groups/index.tsx";

// Components
import { RiBallPenFill } from "react-icons/ri";
import Loader from "../components/atoms/Loader/index.tsx";
import MainTemplate from "../components/templates/MainTemplate.tsx";
import SectionTemplate from "../components/templates/SectionTemplate.tsx/index.tsx";
import Button from "../components/atoms/Button/index.tsx";
import Pagenation from "../components/organisms/Pagination/index.tsx";
import Card from "../components/organisms/Group/GroupCard/index.tsx";
import styledComponent from "../components/organisms/Group/Group.style.tsx";
import SearchBar from "../components/molecules/SearchBar/index.tsx";

const { GroupContainer, GroupCardContainer } = styledComponent;

function StudyGroup() {
  const navigate = useNavigate();
  const { data: groups, isLoading } = useGroups();
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState<GroupModel[] | null>(null);

  useEffect(() => {
    console.log("filteredPosts", filteredPosts);
  }, [filteredPosts]);

  // 페이지네이션
  const NUM_POSTS_PER_PAGE = 5;
  const pageCount = filteredPosts
    ? Math.ceil(filteredPosts.length / NUM_POSTS_PER_PAGE)
    : 0;
  const startIndex = currentPage * NUM_POSTS_PER_PAGE;

  // 모집글 작성 버튼 클릭 시, 로그인 여부에 따라 다른 페이지로 이동
  const handleClickRecruitmentPosting = () => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/studygroup/recruit");
    } else {
      navigate("/login");
    }
  };

  // 페이지네이션 클릭 시, 현재 페이지 변경
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    if (groups) {
      setFilteredPosts(groups);
    }
  }, [groups]);

  return (
    <MainTemplate pageName="studyGroup" contentsWidth="920px">
      <SectionTemplate sectionName="스터디 그룹">
        {/* 검색창  */}
        <SearchBar
          groups={groups}
          setFilteredPosts={setFilteredPosts}
        ></SearchBar>

        {/* 모집글 작성 버튼 */}
        <Button
          type="button"
          height="36px"
          buttonType="primary"
          style={{
            marginLeft: "auto",
            fontSize: "14px",
            marginBottom: "14px",
          }}
          rounded
          onClick={handleClickRecruitmentPosting}
        >
          <RiBallPenFill style={{ marginRight: "4px" }} />
          모집글 작성
        </Button>

        {/* 모집글 리스트 */}
        <GroupContainer>
          {!isLoading && Array.isArray(groups) && groups.length > 0 ? (
            <>
              <GroupCardContainer>
                {/* 필터링된 게시물이 존재하는 경우 */}
                {!isLoading &&
                Array.isArray(filteredPosts) &&
                filteredPosts.length > 0 ? (
                  <>
                    <GroupCardContainer>
                      {filteredPosts
                        .slice(startIndex, startIndex + NUM_POSTS_PER_PAGE)
                        .map((post: GroupModel) => (
                          <Card key={post.id} data={post} />
                        ))}
                    </GroupCardContainer>
                    <Pagenation
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  </>
                ) : (
                  <>
                    {/* 로딩 중이거나 검색된 게시글이 없을 때 */}
                    {isLoading ? <Loader /> : <p>No posts found.</p>}
                  </>
                )}
              </GroupCardContainer>
            </>
          ) : (
            <Loader />
          )}
        </GroupContainer>
      </SectionTemplate>
    </MainTemplate>
  );
}

export default StudyGroup;
