import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { postsLoadingState, postsState } from "../../atoms/postState";

import { db } from "../../../firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";

interface commentModel {
  uid: string;
  nickname: string;
  comment: string;
  date: string;
}

interface MemberModel {
  uid: string;
}

export interface PostModel {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  member_count: number;
  group_type: string;
  group_region?: string[];
  imgUrl: string;
  tag: string[];
  members: commentModel[];
  comments: commentModel[];
}

async function fetchPosts(): Promise<PostModel[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "posts"), orderBy("updatedAt", "desc"))
    );

    const posts: PostModel[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as PostModel)
    );

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function usePosts() {
  const [posts, setPosts] = useRecoilState(postsState);
  const [isLoading, setLoading] = useRecoilState(postsLoadingState);
  const query = useQuery<PostModel[] | undefined>("posts", fetchPosts, {
    refetchOnWindowFocus: false,
  });

  // 데이터가 업데이트 되면 posts 상태를 업데이트
  useEffect(() => {
    if (query.data) {
      setPosts(query.data);
    }
  }, [query.data, setPosts]);

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
    isLoading: query.isLoading,
  };
}

export { usePosts };
