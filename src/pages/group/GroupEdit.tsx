import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

import { useForm } from "react-hook-form";

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
import StyledLink from "../../components/atoms/StyledLink/StyledLink.style.tsx";
import { AuthContext } from "../../apis/user/index.tsx";
import { GroupModel, useGroups } from "../../apis/groups/index.tsx";
import { collection, doc, updateDoc } from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../firebase.tsx";

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

function GroupEdit() {
  const firebaseStore = "groups";
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();

  const { data: groups } = useGroups();
  const { currentUser } = useContext(AuthContext);
  const [isPageloading, setPageLoading] = useState<boolean>(true);

  const [currentData, setCurrentData] = useState<GroupModel>();
  const [currentImgUrl, setCurrentImgUrl] = useState<string | undefined>("");

  const [file, setFile] = useState<File | null>(null);
  const [isImgUploading, setImgUploading] = useState(false);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const groupType = watch("groupType");

  useEffect(() => {
    if (groups) {
      const group = groups.find((group) => group.id === param.id);
      setCurrentData(group);
      setCurrentImgUrl(group?.imgUrl);
      setValue("groupType", group?.group_type);
      setValue("title", group?.title);
      setValue("memberCount", group?.member_count);
      setValue("description", group?.description);
      setValue("region", group?.group_region);
      setValue("tag", String(group?.tag));
      setPageLoading(false);
    }
  }, [groups]);

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

  const updateGroup = async (formData: any) => {
    const groupData = {
      ...currentData,
      title: formData.title,
      updatedAt: new Date(),
      group_type: formData.groupType,
      group_region:
        groupType === "오프라인" || groupType === "전체"
          ? [...formData.region]
          : "",
      member_count: formData.memberCount,
      description: formData.description,
      imgUrl: formData.downloadURL || currentImgUrl,
      tag: formData.tag ? formData.tag.split(",") : [],
    };

    try {
      const groupCollectionRef = collection(db, firebaseStore);
      const firestoreDocRef = doc(groupCollectionRef, param.id);

      await updateDoc(firestoreDocRef, groupData);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(updateGroup);

  const onSubmit = async (formData: any) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // 태그에 입력된 내용이 , 나 공백으로 끝나면 , 제거하고 저장
    if (formData.tag && formData.tag[formData.tag.length - 1] === ",") {
      formData.tag = formData.tag.slice(0, -1);
      setValue("tag", formData.tag);
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

  // 전송 완료 후 모달
  const handleConfirm = () => {
    navigate(-1);
  };

  // 디버깅용
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <MainTemplate pageName="studyGroupRecruit">
      {/* 뒤로가기 버튼 */}
      <StyledLink to={`/studygroup/${param.id}`}>
        <IoArrowBack style={{ marginRight: "5px", marginBottom: "21px" }} />
        모집글로 돌아가기
      </StyledLink>

      <SectionTemplate sectionName={"스터디 모집글 수정"} border={true}>
        {/* 폼 제출 로딩 */}
        {isLoading && <Loader bgColor="white" />}
        {isPageloading && <Loader bgColor="white" />}

        {/* 작성 폼 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이미지 업로더  */}
          <FileUploader
            onFileSelected={setFile}
            className={isImgUploading ? "loading" : ""}
            storedImgUrl={currentImgUrl}
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

          {/* 최대 모집 인원  */}
          <Input
            type="text"
            label="태그"
            inputDescription="❗태그와 태그는 콤마(,) 로 구분해주세요"
            placeholder="해시태그, 해시태그, 해시태그"
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
            모집글 수정
          </Button>
        </form>

        {showAlertModal && (
          <AlertModal
            title="모집글 수정 완료"
            message="모집글 수정이 완료되었습니다. 모집글 페이지로 이동합니다."
            onConfirm={handleConfirm}
          ></AlertModal>
        )}
      </SectionTemplate>
    </MainTemplate>
  );
}

export default GroupEdit;
