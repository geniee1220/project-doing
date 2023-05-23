import React, { useContext, useEffect, useState } from "react";
import MainTemplate from "../components/templates/MainTemplate.tsx";
import SectionTemplate from "../components/templates/SectionTemplate.tsx/index.tsx";

import styledComponent from "../components/templates/Template.style.tsx";
const { SectionInner, SectionHeader, SectionLabel, LoadButton } =
  styledComponent;

import { GroupModel, useGroups } from "../apis/groups/index.tsx";

import { app, db } from "../../firebase.tsx";

import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../apis/user/index.tsx";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.tsx";
import Card from "../components/organisms/Group/GroupCard/index.tsx";
import Loader from "../components/atoms/Loader/index.tsx";
import GroupApproval from "../components/organisms/Group/GroupApproval/index.tsx";
import { useNavigate } from "react-router";

function MyLounge() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { data: groups, isLoading } = useGroups();

  // 필터링 그룹
  const [isfetchLoading, setIsFetchLoading] = useState(false);
  const [ownGroups, setOwnGroups] = useState<GroupModel[] | undefined>([]);
  const [joinedGroups, setJoinedGroups] = useState<GroupModel[] | undefined>(
    []
  );
  const [applicantGroups, setApplicantGroups] = useState<
    GroupModel[] | undefined
  >([]);
  const [likedGroups, setLikedGroups] = useState<GroupModel[] | undefined>([]);

  const [displayedItems, setDisplayedItems] = useState(3);
  const [additionalItems, setAdditionalItems] = useState(5);

  // 더보기 버튼
  const [totalOwnGroups, setTotalOwnGroups] = useState(0);
  const [totalJoinedGroups, setTotalJoinedGroups] = useState(0);
  const [totalApplicantGroups, setTotalApplicantGroups] = useState(0);
  const [totalLikedGroups, setTotalLikedGroups] = useState(0);

  // firebase
  // groups이 많아지면 groups를 전부 검색하는 것은 비효율적이므로, groups 컬렉션에서 쿼리 필터링
  const groupsCollectionRef = collection(db, "groups");
  const likesCollectionRef = collection(db, "likes");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
    getOwnGroups();
    getJoinedGroups();
    getLikedGroups();
    getApplicantGroups();
  }, [displayedItems, groups, isfetchLoading]);

  // 내가 만든 스터디 그룹
  // groups 컬렉션에서 groups.owner가 user.uid인 것만 가져옴
  const getOwnGroups = async () => {
    const ownGroupQuery = query(
      groupsCollectionRef,
      where("uid", "==", currentUser)
    );
    const ownGroupSnapshot = await getDocs(ownGroupQuery);

    const ownGroupsData = ownGroupSnapshot?.docs.map((doc) => {
      // doc.data()는 firebase에서 제공하는 타입이기 때문에, GroupModel로 타입을 단언해주어야 함
      return { ...(doc.data() as GroupModel), id: doc.id };
    });

    setOwnGroups(ownGroupsData);
    setTotalOwnGroups(ownGroupSnapshot.size);
  };

  // 내가 가입한 스터디 그룹
  // groups 컬렉션에서 groups.members에 user.uid가 포함된 것만 가져옴
  const getJoinedGroups = async () => {
    const joinedGroupQuery = query(
      groupsCollectionRef,
      where("members", "array-contains", currentUser)
    );
    const joinedGroupSnapshot = await getDocs(joinedGroupQuery);

    const joinedGroupsData = joinedGroupSnapshot?.docs.map((doc) => {
      return { ...(doc.data() as GroupModel), id: doc.id };
    });

    setJoinedGroups(joinedGroupsData);
    setTotalJoinedGroups(joinedGroupSnapshot.size);
  };

  // 내가 가입 신청한 스터디 그룹
  // groups 컬렉션에서 groups.applicants 배열에 있는 객체 중 user.uid가 포함된 것만 가져옴
  const getApplicantGroups = async () => {
    const applicantGroupQuery = query(
      groupsCollectionRef,
      where("applicants", "array-contains", {
        uid: currentUser,
        nickname: userData?.nickname,
      })
    );

    const applicantGroupSnapshot = await getDocs(applicantGroupQuery);

    const applicantGroupsData = applicantGroupSnapshot?.docs.map((doc) => {
      return { ...(doc.data() as GroupModel), id: doc.id };
    });

    // 디버깅용 코드
    // console.log("applicantGroupSnapshot", applicantGroupSnapshot.docs[0]);
    // console.log("applicantGroupsData", applicantGroupsData);

    setApplicantGroups(applicantGroupsData);
    setTotalApplicantGroups(applicantGroupSnapshot.size);
  };

  // like한 스터디 그룹
  // likes 컬렉션에서 likes.uid가 user.uid인 것만 가져옴
  const getLikedGroups = async () => {
    const likedGroupQuery = query(
      likesCollectionRef,
      where("uid", "==", currentUser)
    );
    const likedGroupSnapshot = await getDocs(likedGroupQuery);

    // groups document의 docId
    const likedGroupsData = likedGroupSnapshot?.docs[0]?.data()?.docList;

    let groupsData: any = [];

    if (likedGroupsData && likedGroupsData.length > 0) {
      // likedGroupsData 배열의 각 아이템을 순회하며 group 정보를 조회
      await Promise.all(
        likedGroupsData
          .slice(0, displayedItems)
          .map(async (likedGroup: any) => {
            const groupDocRef = doc(groupsCollectionRef, likedGroup);
            const groupSnapshot = await getDoc(groupDocRef);
            const groupData = groupSnapshot.data();
            groupsData.push({ ...groupData, id: groupSnapshot.id });
          })
      );

      groupsData = groupsData.filter((group: any) => {
        return group?.members.length + 1 !== group?.member_count;
      });

      setLikedGroups(groupsData);
      setTotalLikedGroups(likedGroupsData.length);
    } else {
      console.log("");
    }
  };

  // 멤버 승인 및 거절 로직
  const handleApproval = async (applicants: any, groupId: string) => {
    setIsFetchLoading(true);
    const groupDocRef = doc(groupsCollectionRef, groupId);
    const groupSnapshot = await getDoc(groupDocRef);
    const groupData = groupSnapshot.data();

    if (groupData) {
      const updatedApplicants = groupData?.applicants.filter(
        (applicant: any) => applicant.uid !== applicant.uid
      );

      const updatedMembers = [
        ...groupData.members,
        ...groupData.applicants.map((applicant: any) => applicant.uid),
      ];

      await updateDoc(groupDocRef, {
        applicants: updatedApplicants,
        members: updatedMembers,
      });
      setIsFetchLoading(false);
    } else {
      console.log("그룹이 없습니다.");
    }
  };

  // 멤버 거절 로직
  const handleReject = async (applicants: any, groupId: string) => {
    setIsFetchLoading(true);
    const groupDocRef = doc(groupsCollectionRef, groupId);
    const groupSnapshot = await getDoc(groupDocRef);
    const groupData = groupSnapshot.data();

    if (groupData) {
      const updatedApplicants = groupData?.applicants.filter(
        (applicant: any) => applicant.uid !== applicant.uid
      );

      await updateDoc(groupDocRef, {
        applicants: updatedApplicants,
      });

      setIsFetchLoading(false);
    } else {
      console.log("그룹이 없습니다.");
    }
  };

  const handleLoadMore = () => {
    setDisplayedItems((displayedItems) => displayedItems + additionalItems);
  };

  return (
    <MainTemplate contentsWidth="920px" pageName="myLounge">
      <SectionTemplate sectionName={<>{userData.nickname}님의 라운지</>}>
        <SectionInner style={{ paddingBottom: "100px" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* 내가 만든 그룹  */}
              <div style={{ marginTop: "52px" }}>
                <SectionHeader>
                  <SectionLabel style={{ marginBottom: "0" }}>
                    내가 만든 그룹
                  </SectionLabel>
                </SectionHeader>
                {ownGroups &&
                  ownGroups?.slice(0, displayedItems).map((group, index) => (
                    <React.Fragment key={group.id}>
                      <Card data={group} />
                      {group.applicants.length > 0 && (
                        <GroupApproval
                          key={`applicantMember-${index}`}
                          data={group.applicants}
                          onAccept={() =>
                            handleApproval(group.applicants, group.id)
                          }
                          onReject={() =>
                            handleReject(group.applicants, group.id)
                          }
                        ></GroupApproval>
                      )}
                    </React.Fragment>
                  ))}
                {/* 더보기 버튼 */}
                {totalOwnGroups === 0 && <p>내가 만든 그룹이 없습니다.</p>}

                {displayedItems < totalOwnGroups && (
                  <LoadButton
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleLoadMore}
                  >
                    More +
                  </LoadButton>
                )}
              </div>
              {/* 내가 가입한 그룹  */}
              <div style={{ marginTop: "100px" }}>
                <SectionHeader>
                  <SectionLabel style={{ marginBottom: "0" }}>
                    내가 가입한 그룹
                  </SectionLabel>
                </SectionHeader>
                {totalJoinedGroups === 0 && <p>내가 가입한 그룹이 없습니다.</p>}

                {joinedGroups &&
                  joinedGroups
                    ?.slice(0, displayedItems)
                    .map((group, index) => <Card key={index} data={group} />)}
                {/* 더보기 버튼 */}
                {displayedItems < totalJoinedGroups && (
                  <LoadButton
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleLoadMore}
                  >
                    More +
                  </LoadButton>
                )}
              </div>
              {/* 내가 지원 중인 그룹 */}
              <div style={{ marginTop: "100px" }}>
                <SectionHeader>
                  <SectionLabel style={{ marginBottom: "0" }}>
                    내가 지원 중인 그룹
                  </SectionLabel>
                </SectionHeader>
                {totalApplicantGroups === 0 && (
                  <p>내가 지원 중인 그룹이 없습니다.</p>
                )}

                {applicantGroups &&
                  applicantGroups
                    ?.slice(0, displayedItems)
                    .map((group, index) => <Card key={index} data={group} />)}
                {/* 더보기 버튼 */}
                {displayedItems < totalApplicantGroups && (
                  <LoadButton
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleLoadMore}
                  >
                    More +
                  </LoadButton>
                )}
              </div>
              <div style={{ marginTop: "100px" }}>
                <SectionHeader>
                  <SectionLabel style={{ marginBottom: "0" }}>
                    내가 관심 있는 그룹
                  </SectionLabel>
                </SectionHeader>
                {totalLikedGroups === 0 && (
                  <p>내가 관심 있는 그룹이 없습니다.</p>
                )}

                {likedGroups &&
                  likedGroups
                    ?.slice(0, displayedItems)
                    .map((group, index) => <Card key={index} data={group} />)}
                {/* 더보기 버튼 */}
                {displayedItems < totalLikedGroups && (
                  <LoadButton
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleLoadMore}
                  >
                    More +
                  </LoadButton>
                )}
              </div>
            </>
          )}
        </SectionInner>
      </SectionTemplate>
    </MainTemplate>
  );
}

export default MyLounge;
