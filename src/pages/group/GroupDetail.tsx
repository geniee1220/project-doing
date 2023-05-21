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
import {
  ApplicantModel,
  GroupModel,
  useGroups,
} from "../../apis/groups/index.tsx";
import { AuthContext } from "../../apis/user/index.tsx";

import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState.tsx";
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
  const userData = useRecoilValue(userState);
  const { isCommentLoading } = useComments();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<GroupModel>();

  // firebase
  const groupCollectionRef = collection(db, "groups");
  const commentCollectionRef = collection(db, "comments");

  // 그룹 지원
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApply, setIsApply] = useState(false);

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

  // 지원자에 현재 유저가 있는지 확인
  useEffect(() => {
    if (!currentUser) return;

    const applicants: ApplicantModel[] = currentData?.applicants ?? [];
    const isCurrentUser = applicants.some(
      (applicant) => applicant.uid === currentUser
    );

    console.log("isCurrentUser: ", isCurrentUser);

    if (isCurrentUser) {
      setIsApply(true);
    }
  }, [group, currentUser, currentData]);

  const getDocData = async () => {
    const documentQuery = query(
      commentCollectionRef,
      where("docId", "==", docId)
    );
    const docSnap = await getDocs(documentQuery);

    return docSnap;
  };

  // (글)그룹 삭제 로직
  const deleteGroup = async () => {
    await deleteDoc(doc(groupCollectionRef, docId));

    // 댓글 삭제
    const docSnap = await getDocData();
    const commentDoc = docSnap.docs[0];
    deleteDoc(doc(commentCollectionRef, commentDoc.id));

    // 좋아요 삭제 likes 컬렉션에서 해당 docId 삭제
    const likesCollectionRef = collection(db, "likes");
    const currentUserQuery = query(
      likesCollectionRef,
      where("uid", "==", currentUser)
    );
    const currentUserSnapshot = await getDocs(currentUserQuery);
    const likesData = currentUserSnapshot.docs[0].data();
    const docData = likesData.docList;

    if (docData.includes(docId)) {
      const filtered = docData.filter((item: string) => item !== docId);

      await updateDoc(currentUserSnapshot.docs[0].ref, {
        docList: filtered,
      });
    }

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

  // 그룹 지원 로직
  const handleApplyGroupModal = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    setIsApplyModalOpen(true);
  };

  // 그룹 지원 취소
  const handleCancelGroup = async () => {
    const filteredArr = (currentData?.applicants || []).filter(
      (item) => item.uid !== currentUser
    );

    await updateDoc(doc(groupCollectionRef, docId), {
      applicants: filteredArr,
    });

    setIsApplyModalOpen(false);
    setIsApply(false);
  };

  const handleApplyGroup = async () => {
    const applicantData = {
      uid: currentUser,
      nickname: userData.nickname,
    };

    // 새로운 지원자인 경우에만 추가
    if (isApply === false) {
      const uniqueArr = Array.from(
        new Set([...(currentData?.applicants ?? []), applicantData])
      );

      await updateDoc(doc(groupCollectionRef, docId), {
        applicants: uniqueArr,
      });
    }

    setIsApplyModalOpen(false);
    setIsApply(true);
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

                <StyledLink
                  type="button"
                  to={`/studygroup/edit/${docId}`}
                  style={{ fontSize: "16px" }}
                >
                  모집글 수정
                </StyledLink>
              </div>
            </>
          )
        }

        {currentUser !== currentData?.uid &&
          group !== undefined &&
          (isApply ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0 10px",
              }}
            >
              <Button
                buttonType="outline"
                rounded
                onClick={handleApplyGroupModal}
              >
                지원 취소
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0 10px",
              }}
            >
              <Button
                buttonType="primary"
                rounded
                onClick={handleApplyGroupModal}
              >
                참여 신청
              </Button>
            </div>
          ))}
      </SectionTemplate>

      {!isCommentLoading && (
        <Comment
          deleteCommentItem={deleteCommentItem}
          onDeleteClick={handleConfirmModal}
        ></Comment>
      )}

      {/* 그룹 지원 확인 모달 */}
      {isApplyModalOpen && (
        <ConfirmModal
          title={isApply ? "스터디 그룹 지원 취소" : "스터디 그룹 지원"}
          message={
            <>
              {currentData?.title}
              <br />
              {isApply
                ? "스터디 그룹 지원을 취소하시겠습니까?"
                : "스터디 그룹에 지원 하시겠습니까?"}
            </>
          }
          onConfirm={isApply ? handleCancelGroup : handleApplyGroup}
          onCancel={() => setIsApplyModalOpen(false)}
        ></ConfirmModal>
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
