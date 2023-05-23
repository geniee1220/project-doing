import React, { useCallback, useContext, useEffect, useState } from "react";

import { db } from "../../../../firebase";

import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

import { CommentModel, useComments } from "../../../apis/comments";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { AuthContext } from "../../../apis/user";
import { userState } from "../../../atoms/userState";
import { useRecoilValue } from "recoil";

// react-hook-form
import { SubmitHandler, useForm } from "react-hook-form";

// components
import styledComponent from "./Comment.style";
import Button from "../../atoms/Button";
import Textarea from "../../atoms/Form/Textarea";

const {
  CommentContainer,
  CommentHeader,
  CommentInner,
  CommentContentsContainer,
  CommentContentsWrapper,
  CommentUsername,
  CommentContent,
  CommentDate,
  CommentEditorContainer,
} = styledComponent;

interface CommentProps {
  deleteCommentItem: string;
  onDeleteClick: (commentId: string) => void;
}

function Comment({ deleteCommentItem, onDeleteClick }: CommentProps) {
  const param = useParams<{ id: string }>();
  const user = useRecoilValue(userState);
  const { data: data, isCommentLoading } = useComments();
  const { currentUser } = useContext(AuthContext);
  const [commentsData, setCommentsData] = useState<CommentModel | undefined>(
    undefined
  );

  // 전체 데이터에서 해당 doc 댓글 가져오기
  useEffect(() => {
    const filtered = data?.filter((item) => item.docId === param.id);
    if (!filtered) return;

    const objectData = filtered[0];
    setCommentsData({ ...objectData });
  }, []);

  useEffect(() => {
    deleteComment(deleteCommentItem);
  }, [deleteCommentItem]);

  // 댓글 삭제 로직
  const deleteComment = async (commentId: string) => {
    const commentCollectionRef = collection(db, "comments");
    const documentQuery = query(
      commentCollectionRef,
      where("docId", "==", param.id)
    );
    const docSnap = await getDocs(documentQuery);
    const commentDoc = docSnap.docs[0];
    const commentDocRef = doc(db, "comments", commentDoc.id);

    const filtered = commentsData?.comments.filter(
      (item) => item.id !== commentId
    );

    if (filtered) {
      await updateDoc(commentDocRef, {
        comments: filtered,
      });

      console.log("filtered", filtered);
      console.log("commentID", commentId);

      const updatedDoc = await getDoc(commentDocRef);
      const updatedData = updatedDoc.data();
      setCommentsData(() => updatedData as CommentModel | undefined);
    }
  };

  // 댓글 작성 로직
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({ mode: "onBlur" });

  const postComment = async (formData: any) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let objectId = "";
    for (let i = 0; i < 10; i++) {
      objectId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const commentArrayData = {
      id: objectId,
      uid: currentUser,
      nickname: user.nickname,
      content: formData.comment,
      createdAt: new Date(),
    };

    try {
      // docId로 컬렉션 검색 후, 없으면 추가, 있으면 업데이트
      const commentCollectionRef = collection(db, "comments");
      const documentQuery = query(
        commentCollectionRef,
        where("docId", "==", param.id)
      );
      const docSnap = await getDocs(documentQuery);
      const commentDoc = docSnap.docs[0];
      const commentDocRef = doc(db, "comments", commentDoc.id);

      // 업데이트
      await updateDoc(commentDocRef, {
        comments: [...commentDoc.data().comments, commentArrayData],
      });

      // 업데이트 후, 데이터 다시 가져오기(댓글 추가 후, 댓글 갯수 업데이트)
      const updatedDoc = await getDoc(commentDocRef);
      const updatedData = updatedDoc.data();

      setCommentsData(() => updatedData as CommentModel | undefined);
      setValue("comment", "");
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate } = useMutation(postComment);

  const onSubmit = async (formData: any) => {
    try {
      mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>
        댓글 <span>{commentsData?.comments?.length}</span>
      </CommentHeader>
      <CommentInner>
        {commentsData &&
          commentsData?.comments?.map((item) => (
            <CommentContentsContainer key={item.id}>
              <CommentContentsWrapper>
                <CommentUsername>{item.nickname}</CommentUsername>
                <CommentDate>
                  {new Intl.DateTimeFormat("ko-KR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(item.createdAt.toDate())}
                </CommentDate>
                {
                  // 댓글 작성자만 삭제 가능
                  item.uid === currentUser && (
                    <Button
                      height={"fit-content"}
                      style={{
                        fontSize: "13px",
                        padding: "0",
                        marginLeft: "10px",
                      }}
                      onClick={() => onDeleteClick(item.id)}
                    >
                      삭제
                    </Button>
                  )
                }
              </CommentContentsWrapper>
              <CommentContent>{item.content}</CommentContent>
            </CommentContentsContainer>
          ))}

        {/* 글 작성 */}
        <CommentEditorContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              height="80px"
              style={{ marginBottom: "10px" }}
              {...register("comment", { required: true })}
            ></Textarea>
            {/* 제출 버튼 */}
            <Button
              type="submit"
              style={{
                padding: "0 0 8px 10px",
                height: "fit-content",
                marginLeft: "auto",
                fontSize: "15px",
              }}
            >
              댓글 작성
            </Button>
          </form>
        </CommentEditorContainer>
      </CommentInner>
    </CommentContainer>
  );
}

export default Comment;
