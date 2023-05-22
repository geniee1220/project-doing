import React, { useContext, useEffect, useState } from "react";
import { ApplicantModel, useGroups } from "../../../../apis/groups";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase";

// components
import styledComponent from "./GroupApproval.style";
import Button from "../../../atoms/Button";
const {
  GroupApprovalContainer,
  GroupApprovalHeader,
  GroupApprovalList,
  GroupApprovalItem,
  GroupApprovalItemLabel,
  GroupApprovalInfoContainer,
  GroupApprovalInfo,
  GroupApprovalItemButtonContainer,
  GroupApprovalItemButton,
} = styledComponent;

interface GroupApprovalProps {
  children?: React.ReactNode;
  data?: any;
  onReject?: any;
  onAccept?: any;
}

interface ApplicantInfo {
  nickname: string;
  uid: string;
  email: string;
  password: string;
  selfIntroduction?: string;
  tag?: string[];
}

function GroupApproval({
  data,
  children,
  onAccept,
  onReject,
}: GroupApprovalProps) {
  const { data: groups } = useGroups();
  const [applicantInfo, setApplicantInfo] = useState<ApplicantInfo>();

  useEffect(() => {
    getApplicantInfo();
  }, []);

  const getApplicantInfo = async () => {
    const collectionRef = collection(db, "users");
    const userQuery = query(collectionRef, where("uid", "==", data[0].uid));
    const userSnap = await getDocs(userQuery);
    const applicantInfo = userSnap.docs[0];
    const applicantInfoData = applicantInfo.data();

    setApplicantInfo(applicantInfoData as ApplicantInfo);
  };

  return (
    <GroupApprovalContainer>
      <GroupApprovalHeader>지원자 목록</GroupApprovalHeader>
      <div>
        <GroupApprovalList>
          {data.map((applicant: ApplicantModel, index: number) => (
            <GroupApprovalItem key={`applicantItem-${index}`}>
              <GroupApprovalItemLabel>
                {applicant.nickname}
              </GroupApprovalItemLabel>
              <GroupApprovalInfoContainer>
                <GroupApprovalInfo>
                  {applicantInfo?.selfIntroduction
                    ? applicantInfo?.selfIntroduction
                    : "스터디 그룹에 지원합니다. doing에서 함께 공부해요!"}
                </GroupApprovalInfo>

                <GroupApprovalItemButtonContainer>
                  {/* 거절 버튼 */}
                  <Button
                    type="button"
                    onClick={() => onReject(applicant.uid)}
                    rounded
                    style={{
                      display: "inline-flex",
                      paddingLeft: "0",
                      color: "rgb(255, 85, 85)",
                    }}
                  >
                    거절
                  </Button>

                  {/* 수락 버튼 */}
                  <Button
                    type="button"
                    buttonType="outline"
                    onClick={() => onAccept(applicant.uid)}
                    rounded
                    style={{
                      display: "inline-flex",
                    }}
                  >
                    멤버로 초대
                  </Button>
                </GroupApprovalItemButtonContainer>
              </GroupApprovalInfoContainer>
            </GroupApprovalItem>
          ))}
        </GroupApprovalList>
      </div>
    </GroupApprovalContainer>
  );
}

export default GroupApproval;
