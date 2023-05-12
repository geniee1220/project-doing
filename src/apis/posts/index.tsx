import { useQuery } from "react-query";

import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

interface commentModel {
  uid: string;
  nickname: string;
  comment: string;
  date: string;
}

interface memberModel {
  uid: string;
}

export interface PostModel {
  id: string;
  title: string;
  author: string;
  created_date: string;
  updated_date: string;
  description: string;
  member_count: number;
  group_type: string;
  group_region?: string;
  tags: string[];
  members: memberModel[];
  comments: commentModel[];
}

async function fetchPosts(): Promise<PostModel[]> {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as PostModel)
  );
}

function usePosts() {
  return useQuery<PostModel[] | undefined>("posts", fetchPosts, {
    refetchOnWindowFocus: false,
  });
}

export { usePosts };
