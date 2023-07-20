import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { groupsLoadingState, groupsState } from '../../atoms/groupState';

import { db } from '../../../firebase';
import {
  query,
  collection,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

export interface ApplicantModel {
  nickname: string;
  uid: string;
}

export interface GroupModel {
  id: string;
  title: string;
  uid: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description: string;
  member_count: number;
  group_type: string;
  group_region?: string[];
  imgUrl: string;
  tag: string[];
  members: string[];
  applicants: ApplicantModel[];
}

async function fetchGroups(): Promise<GroupModel[]> {
  try {
    // groups 컬렉션의 모든 문서 가져오기
    const snapshot = await getDocs(
      query(collection(db, 'groups'), orderBy('updatedAt', 'desc'))
    );

    const groups: GroupModel[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as GroupModel)
    );

    return groups;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function useGroups() {
  const [groups, setGroups] = useRecoilState(groupsState);
  const [isLoading, setLoading] = useRecoilState(groupsLoadingState);

  // 데이터를 가져오는 쿼리
  const query = useQuery<GroupModel[] | undefined>('groups', fetchGroups, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });

  // 데이터가 업데이트 되면 groups 상태를 업데이트
  useEffect(() => {
    if (query.data) {
      setGroups(query.data);
    }
  }, [query.data, setGroups]);

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

export { useGroups };
