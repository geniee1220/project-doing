import React, { useState, useEffect, useContext } from "react";

// react router
import { useNavigate } from "react-router";

// recoil
import { useSetRecoilState, useRecoilValue } from "recoil";
import { postsLoadingState, postsState } from "../atoms/postState.tsx";

// firebase post
import { usePosts } from "../apis/posts/index.tsx";
import { PostModel } from "../apis/posts/index.tsx";

// Components
import { RiBallPenFill } from "react-icons/ri";
import Loader from "../components/atoms/Loader/index.tsx";
import MainTemplate from "../components/templates/MainTemplate.tsx";
import SectionTemplate from "../components/templates/SectionTemplate.tsx/index.tsx";
import Button from "../components/atoms/Button/index.tsx";
import Pagenation from "../components/organisms/Pagination/index.tsx";
import Card from "../components/organisms/Group/GroupCard/index.tsx";
import styledComponent from "../components/organisms/Group/Group.style.tsx";

const { GroupContainer, GroupCardContainer } = styledComponent;

function StudyGroup() {
  const navigate = useNavigate();

  const { data: posts, isLoading } = usePosts();

  const [currentPage, setCurrentPage] = useState(0);

  const NUM_POSTS_PER_PAGE = 5;
  const pageCount = posts ? Math.ceil(posts.length / NUM_POSTS_PER_PAGE) : 0;

  const startIndex = currentPage * NUM_POSTS_PER_PAGE;

  // 모집글 작성 버튼 클릭 시, 로그인 여부에 따라 다른 페이지로 이동
  const handleClickRecruitmentPosting = () => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/study-group/recruit");
    } else {
      navigate("/login");
    }
  };

  // 페이지네이션 클릭 시, 현재 페이지 변경
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <MainTemplate pageName="studyGroup" contentsWidth="920px">
      <SectionTemplate sectionName="스터디 그룹">
        {/* 모집글 작성 버튼 */}
        <Button
          type="button"
          height="36px"
          buttonType="primary"
          style={{ marginLeft: "auto", fontSize: "14px" }}
          rounded
          onClick={handleClickRecruitmentPosting}
        >
          <RiBallPenFill style={{ marginRight: "4px" }} />
          모집글 작성
        </Button>

        {/* 모집글 리스트 */}
        <GroupContainer>
          {!isLoading && Array.isArray(posts) && posts.length > 0 ? (
            <>
              <GroupCardContainer>
                {posts
                  .slice(startIndex, startIndex + NUM_POSTS_PER_PAGE)
                  .map((post: PostModel) => (
                    <Card key={post.id} data={post}></Card>
                  ))}
              </GroupCardContainer>

              {/* 페이지네이션 */}
              <Pagenation
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              ></Pagenation>
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
