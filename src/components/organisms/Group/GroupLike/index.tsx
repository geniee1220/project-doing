import React, { useState, useContext, useEffect } from "react";
import { db } from "../../../../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { AuthContext } from "../../../../apis/user";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import styledComponent from "./GroupLike.style";
import { useNavigate } from "react-router";
import { get, set } from "firebase/database";
const { GroupLikeButton } = styledComponent;

interface GroupLikeProps {
  docId: string;
}

function GroupLike({ docId }: GroupLikeProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [docData, setDocData] = useState<string[]>([]);

  const handleLike = async () => {
    if (!currentUser) {
      return navigate("/login");
    }

    try {
      // likes 컬렉션에 현재 로그인한 유저의 uid로 문서를 검색
      const likesCollectionRef = collection(db, "likes");

      // 현재 유저의 uid 값을 가진 도큐먼트를 검색
      const currentUserQuery = query(
        likesCollectionRef,
        where("uid", "==", currentUser)
      );
      const currentUserSnapshot = await getDocs(currentUserQuery);

      console.log("currentUserSnapshot", currentUserSnapshot);
      console.log("currentUserSnapshot.docs", currentUserSnapshot.docs);

      // likes 컬렉션에 현재 로그인한 유저의 uid로 문서를 검색
      // 문서가 없으면 새로운 문서를 생성
      if (currentUserSnapshot.empty) {
        await setDoc(doc(likesCollectionRef), {
          uid: currentUser,
          docList: [docId],
        });
        return;
      }

      // 1. 문서가 있으면 데이터를 가져오고, 없으면 새로운 문서를 생성
      // 검색된 문서의 첫 번째 도큐먼트를 가져옴(유일한 도큐먼트기 때문에 가능)
      const likesData = currentUserSnapshot.docs[0].data();
      const docData = likesData.docList;
      //   setDocData(docData);

      // 컬렉션은 uid, docList:[docId, docId, docId] 형태로 저장
      console.log(docData);

      // 2. 현재 게시글의 docId가 likes 컬렉션에 있는지 확인
      // docList에 현재 게시글의 docId이 있는지 확인해서 있으면 삭제, 없으면 추가
      if (docData.includes(docId)) {
        const filteredDocData = docData.filter((id: string) => id !== docId);

        // console.log("filteredDocData", filteredDocData);

        await updateDoc(currentUserSnapshot.docs[0].ref, {
          docList: filteredDocData,
        });

        setIsLiked(false);
      } else {
        const newDocData = [...docData, docId];

        // console.log("newDocData", newDocData);

        await updateDoc(currentUserSnapshot.docs[0].ref, {
          docList: newDocData,
        });

        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  // 디버깅용 코드
  useEffect(() => {
    console.log("isLiked", isLiked);
  }, [isLiked]);

  return (
    <GroupLikeButton onClick={handleLike}>
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
    </GroupLikeButton>
  );
}

export default GroupLike;