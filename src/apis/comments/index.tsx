import { useEffect } from "react";
import { useQuery } from "react-query";

import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { db } from "../../../firebase";
import {
  query,
  collection,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { commentLoadingState, commentState } from "../../atoms/groupState";

export interface CommentArrayModel {
  id: string;
  uid: string;
  nickname: string;
  content: string;
  createdAt: Timestamp;
}

export interface CommentModel {
  id: string;
  docId: string;
  uid: string;
  comments: CommentArrayModel[];
}

async function fetchComments(): Promise<CommentModel[]> {
  try {
    const snapshot = await getDocs(query(collection(db, "comments")));

    const comments: CommentModel[] = snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
        } as CommentModel)
    );

    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function useComments() {
  const [comments, setComments] = useRecoilState(commentState);
  const [isLoading, setLoading] = useRecoilState(commentLoadingState);

  // react-query의 useQuery를 사용하여 데이터를 가져온다.
  // refetchOnWindowFocus: false 옵션을 사용하여 윈도우 포커스가 변경되어도 데이터를 다시 가져오지 않도록 한다.(캐시를 사용)
  const query = useQuery<CommentModel[] | undefined>(
    "comments",
    fetchComments,
    {
      refetchOnWindowFocus: false,
    }
  );

  // 데이터가 업데이트 되면 groups 상태를 업데이트
  useEffect(() => {
    if (query.data) {
      setComments(query.data);
    }
  }, [query.data, setComments]);

  // 로딩 상태가 바뀌면 로딩 상태를 업데이트
  useEffect(() => {
    if (query.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [query.isLoading, setLoading]);

  // 데이터와, 로딩 상태를 반환
  return {
    ...query,
    isCommentLoading: query.isLoading,
  };
}

export { useComments };
