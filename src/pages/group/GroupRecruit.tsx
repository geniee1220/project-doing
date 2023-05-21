import { useState, useEffect, useContext } from "react";

// react-query
import { useMutation } from "react-query";

// firebase
import { storage, db } from "../../../firebase.tsx";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import {
  
  ref,

  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// react-hook-form
import { useForm } from "react-hook-form";

import { AuthContext } from "../../apis/user/index.tsx";
import { useNavigate } from "react-router";

// components
import MainTemplate from "../../components/templates/MainTemplate.tsx/index.tsx";
import SectionTemplate from "../../components/templates/SectionTemplate.tsx/index.tsx";
import Button from "../../components/atoms/Button/index.tsx";
import Input from "../../components/atoms/Form/Input/index.tsx";
import Textarea from "../../components/atoms/Form/Textarea/index.tsx";
import Radio from "../../components/atoms/Form/Radio/index.tsx";
import CheckboxGroup from "../../components/atoms/Form/Checkbox/index.tsx";
import FileUploader from "../../components/molecules/FileUploader/index.tsx";
import Loader from "../../components/atoms/Loader/index.tsx";
import AlertModal from "../../components/organisms/Modal/Alert/index.tsx";
import { useGroups } from "../../apis/groups/index.tsx";

// 하위 컴포넌트로 전달할 상수 props
const radioOptions = [
  { text: "온라인", checked: true },
  { text: "오프라인", checked: false },
  { text: "전체", checked: false },
];

const checkboxOptions = [
  { id: "1", text: "강원" },
  { id: "2", text: "경기" },
  { id: "3", text: "경남" },
  { id: "4", text: "경북" },
  { id: "5", text: "경주" },
  { id: "6", text: "대구" },
  { id: "7", text: "대전" },
  { id: "8", text: "부산" },
  { id: "9", text: "서울" },
  { id: "10", text: "세종" },
  { id: "11", text: "울산" },
  { id: "12", text: "인천" },
  { id: "13", text: "전남" },
  { id: "14", text: "전북" },
  { id: "15", text: "제주" },
  { id: "16", text: "충남" },
  { id: "17", text: "충북" },
];

const placeHolder =
  "스터디 그룹 소개\n - 스터디 그룹의 동기와 목표 \n - 어떤 식으로 진행이 될 예정인지 \n 스터디 그룹에 대한 모든 것을 소개해주세요";

//   모집 글 작성 페이지
function GroupRecruit() {
  const firebaseStore = "groups";
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [isImgUploading, setImgUploading] = useState(false);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { data: groups } = useGroups();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm({ mode: "onBlur" });

  const groupType = watch("groupType");

  useEffect(() => {
    setValue("memberCount", 2);
  });

  // 전송 완료 후 모달
  const handleConfirm = () => {
    navigate(-1);
  };

  // 이미지 업로드
  const uploadImage = async (file: File) => {
    setImgUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);
      setImgUploading(false);
      return downloadURL;
    } catch (error) {
      console.error(error);
      setImgUploading(false);
      return "";
    }
  };

  const addGroup = async (formData: any) => {
    const groupData = {
      uid: currentUser,
      title: formData.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      group_type: formData.groupType,
      group_region:
        groupType === "오프라인" || groupType === "전체"
          ? [...formData.region]
          : "",
      member_count: formData.memberCount as number,
      description: formData.description,
      imgUrl: formData.downloadURL,
      tag: formData.tag ? formData.tag.split(",") : [],
      members: [],
      applicants: [],
    };

    try {
      const { id } = await addDoc(collection(db, firebaseStore), groupData);

      // 가져온 docId로 collection comments에 문서 추가
      const commentCollectionRef = collection(db, "comments");
      await addDoc(commentCollectionRef, {
        docId: id,
        uid: currentUser,
        comments: [],
      });

      // 가져온 docId로 collection likes에 문서 추가
      const likeCollectionRef = collection(db, "likes");

      // 기존에 유저가 likes 한 목록이 없으면 새로 doc을 추가
      const currentUserQuery = query(
        likeCollectionRef,
        where("uid", "==", currentUser)
      );

      const currentUserSnapshot = await getDocs(currentUserQuery);

      if (currentUserSnapshot.empty) {
        await addDoc(likeCollectionRef, {
          uid: currentUser,
          docList: [],
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate } = useMutation(addGroup);

  const onSubmit = async (formData: any) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (formData.region && formData.region.length > 3) {
      setError("region", {
        type: "validate",
        message: "지역은 최대 3개까지 선택 가능합니다.",
      });
      return false;
    }

    setLoading(true);

    try {
      if (file) {
        const downloadURL = await uploadImage(file);
        mutate({ ...formData, downloadURL });
      } else {
        mutate({ ...formData, downloadURL: "" });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // 로딩이 끝나면 확인 모달 팝업
  useEffect(() => {
    if (!isLoading && isLoading !== null) {
      setShowAlertModal(true);
    }
  }, [isLoading]);

  // 디버깅 코드(콘솔)
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  // useEffect(() => {
  //   console.log("file", file);
  // }, [file]);

  return (
    <MainTemplate pageName="studyGroupRecruit">
      <SectionTemplate sectionName={"스터디 모집글"} border={true}>
        {/* 폼 제출 로딩 */}
        {isLoading && <Loader bgColor="white" />}

        {/* 작성 폼 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이미지 업로더  */}
          <FileUploader
            onFileSelected={setFile}
            className={isImgUploading ? "loading" : ""}
          />

          {/* 스터디 그룹 유형 */}
          <Radio
            label="스터디 그룹 유형 *"
            options={radioOptions}
            {...register("groupType", {
              required: "스터디 그룹의 유형을 지정해주세요",
            })}
            errors={errors}
          />

          {groupType !== "온라인" && groupType !== undefined && (
            <CheckboxGroup
              options={checkboxOptions}
              errors={errors}
              {...register("region", {
                required: "지역을 선택해주세요",
              })}
            />
          )}

          {/* 스터디 그룹 이름  */}
          <Input
            type="text"
            label="모집글 이름*"
            width="480px"
            errors={errors}
            {...register("title", { required: "모집글 이름을 입력해주세요" })}
          ></Input>

          {/* 최대 모집 인원  */}
          <Input
            type="text"
            label="모집 인원 *"
            inputUnit="명"
            placeholder="0"
            width="60px"
            errors={errors}
            {...register("memberCount", {
              required: "스터디 그룹의 인원을 정해주세요(최대 15명)",
              pattern: {
                value: /^[0-9]*$/,
                message: "숫자만 입력해주세요",
              },
              min: {
                value: 2,
                message: "최소 1명 이상만 입력 가능합니다.",
              },
              max: {
                value: 15,
                message: "최대 15명까지만 입력 가능합니다.",
              },
            })}
          ></Input>

          {/* 스터디 그룹 소개  */}
          <Textarea
            label="스터디 그룹 소개 *"
            width="824px"
            placeholder={placeHolder}
            errors={errors}
            {...register("description", {
              required: "스터디 그룹 소개를 입력해주세요",
            })}
          ></Textarea>

          {/* 태그  */}
          <Input
            type="text"
            label="태그"
            inputDescription="❗태그와 태그는 콤마(,) 로 구분해주세요"
            placeholder="태그, 태그, 태그"
            width="488px"
            errors={errors}
            {...register("tag", {
              pattern: {
                value: /^[가-힣a-zA-Z\s,]+$/,
                message: "콤마(,)를 제외한 특수문자는 들어갈 수 없습니다",
              },
            })}
          ></Input>

          {/* 제출 버튼 */}
          {/* todo : 수정 버튼 */}
          <Button
            type="submit"
            buttonType="primary"
            width="148px"
            height="42px"
            style={{ margin: "56px auto 0" }}
            rounded
          >
            모집글 제출
          </Button>
        </form>

        {showAlertModal && (
          <AlertModal
            title="모집글 제출 완료"
            message="모집글 제출이 완료되었습니다. 스터디그룹 페이지로 이동합니다."
            onConfirm={handleConfirm}
          ></AlertModal>
        )}
      </SectionTemplate>
    </MainTemplate>
  );
}

export default GroupRecruit;
