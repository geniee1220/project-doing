import React, { useContext, useEffect, useState } from "react";

import { db } from "../../../firebase.tsx";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// react-router
import { useNavigate, useParams } from "react-router";

// apis
import { GroupModel, useGroups } from "../../apis/groups/index.tsx";
import { AuthContext } from "../../apis/user/index.tsx";

// components
import { IoArrowBack } from "react-icons/io5";
import MainTemplate from "../../components/templates/MainTemplate.tsx/index.tsx";
import SectionTemplate from "../../components/templates/SectionTemplate.tsx/index.tsx";
import Card from "../../components/organisms/Group/GroupCard/index.tsx";
import StyledLink from "../../components/atoms/StyledLink/StyledLink.style.tsx";
import Loader from "../../components/atoms/Loader/index.tsx";
import Button from "../../components/atoms/Button/index.tsx";
import Comment from "../../components/organisms/Comment/index.tsx";
import { useComments } from "../../apis/comments/index.tsx";
import ConfirmModal from "../../components/organisms/Modal/Confirm/index.tsx";

function GroupDetail() {
  const { id: docId } = useParams();
  const { data: group, isLoading } = useGroups();
  const { currentUser } = useContext(AuthContext);
  const { isCommentLoading } = useComments();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<GroupModel>();

  // 글 삭제 모달
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);

  // 댓글 삭제 모달
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [deleteCommentItem, setDeleteCommentItem] = useState("");

  // group 데이터에서 현재 페이지에 해당하는 데이터만 추출(docId)
  useEffect(() => {
    const currentPageData = group?.filter((data) => data.id === docId);
    if (!currentPageData) {
      return console.log("결과가 없습니다.");
    }
    setCurrentData(currentPageData[0]);
  }, [group, docId]);

  // 상세 페이지 로딩 시 comment 컬렉션에 groups에 매칭하는 데이터 생성
  useEffect(() => {
    const getComments = async () => {
      try {
        const commentCollectionRef = collection(db, "comments");
        const documentQuery = query(
          commentCollectionRef,
          where("docId", "==", docId)
        );
        const docSnap = await getDocs(documentQuery);

        const commentData = {
          docId: docId,
          uid: currentUser,
          comments: [],
        };

        if (docSnap.empty) {
          await addDoc(commentCollectionRef, commentData);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  // (글)그룹 삭제 로직
  const deleteGroup = async () => {
    const groupCollectionRef = collection(db, "groups");
    await deleteDoc(doc(groupCollectionRef, docId));

    // 댓글 삭제
    const commentCollectionRef = collection(db, "comments");
    const documentQuery = query(
      commentCollectionRef,
      where("docId", "==", docId)
    );
    const docSnap = await getDocs(documentQuery);
    const commentDoc = docSnap.docs[0];
    deleteDoc(doc(commentCollectionRef, commentDoc.id));

    setIsDeleteGroupModalOpen(false);
    navigate(-1);
  };

  // 댓글 삭제 모달 로직
  const handleConfirmModal = (selectedCommentId: string) => {
    setSelectedCommentId(selectedCommentId);
    setIsCommentModalOpen(true);
  };

  const handleModalDeleteConfirm = () => {
    setDeleteCommentItem(selectedCommentId);
    setIsCommentModalOpen(false);
  };

  return (
    <MainTemplate pageName="studyGroupRecruit" contentsWidth="920px">
      {/* 뒤로가기 버튼 */}
      <StyledLink to="/studygroup">
        <IoArrowBack style={{ marginRight: "5px" }} />
        뒤로가기
      </StyledLink>

      {/* 상세 페이지 */}
      <SectionTemplate>
        {currentData ? <Card data={currentData}></Card> : <Loader></Loader>}

        {
          // 현재 로그인한 사용자가 모집글 작성자일 경우, 수정/삭제 버튼 표시
          currentUser === currentData?.uid && currentUser !== null && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0 10px",
                }}
              >
                <Button
                  buttonType="danger-outline"
                  rounded
                  onClick={() => setIsDeleteGroupModalOpen(true)}
                >
                  삭제
                </Button>
                <Button buttonType="default" rounded>
                  모집글 수정
                </Button>
              </div>
            </>
          )
        }

        {
          // 현재 로그인한 사용자가 모집글 작성자가 아닐 경우, 참여 신청 버튼 표시
          currentUser !== currentData?.uid &&
            group !== undefined &&
            currentUser !== null && <Button>참여 신청</Button>
        }
      </SectionTemplate>

      {!isCommentLoading && (
        <Comment
          seletedCommentId={selectedCommentId}
          deleteCommentItem={deleteCommentItem}
          onDeleteClick={handleConfirmModal}
        ></Comment>
      )}

      {/* 글 삭제 확인 모달 */}
      {isDeleteGroupModalOpen && (
        <ConfirmModal
          title="모집글 삭제"
          message={
            <>
              정말로 모집글을 삭제하시겠습니까? <br />
              삭제된 모집글은 복구할 수 없으며 모집글에 작성된 댓글도 함께
              삭제됩니다.
            </>
          }
          onConfirm={deleteGroup}
          onCancel={() => setIsDeleteGroupModalOpen(false)}
        ></ConfirmModal>
      )}

      {/* 댓글 삭제 확인 모달 */}
      {isCommentModalOpen && (
        <ConfirmModal
          title="댓글 삭제"
          message="정말로 댓글을 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다."
          onConfirm={handleModalDeleteConfirm}
          onCancel={() => setIsCommentModalOpen(false)}
        ></ConfirmModal>
      )}
    </MainTemplate>
  );
}

export default GroupDetail;
