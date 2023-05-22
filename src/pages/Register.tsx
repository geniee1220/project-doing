import React, { useRef, useState } from "react";

// react-query
import { useMutation } from "react-query";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// react-router
import { useNavigate } from "react-router";

// react-hook-form
import { useForm } from "react-hook-form";

// components
import MainTemplate from "../components/templates/MainTemplate.tsx";
import Input from "../components/atoms/Form/Input/index.tsx";
import Textarea from "../components/atoms/Form/Textarea/index.tsx";
import Button from "../components/atoms/Button/index.tsx";
import ErrorMessage from "../components/atoms/Message/ErrorMessage/index.tsx";

interface UserProps {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  selfIntroduction?: string;
  tag?: string;
}

function Register() {
  const firebaseStore = "users";
  const navigate = useNavigate();
  // const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserProps>({ mode: "onBlur" });

  const registerUser = async (user: UserProps) => {
    // 이메일 중복 체크
    const emailExists = await getDocs(
      query(collection(db, firebaseStore), where("email", "==", user.email))
    );

    if (!emailExists.empty) {
      setIsAlreadyRegistered(true);
    }

    // 회원가입
    const firebaseUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await addDoc(collection(db, firebaseStore), {
      uid: firebaseUser.user?.uid,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      selfIntroduction: user.selfIntroduction,
      tag: user.tag ? user.tag.split(",") : [],
    });

    // likes 컬렉션 생성
    await addDoc(collection(db, "likes"), {
      uid: firebaseUser.user?.uid,
      docList: [],
    });

    return firebaseUser;
  };

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onValid = async (data: UserProps) => {
    if (data.password !== data.passwordConfirm) {
      return setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
    }

    try {
      const firebaseUser = await mutate({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        selfIntroduction: data.selfIntroduction,
        tag: data.tag,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainTemplate
      pageName={"register"}
      pageTitle={"Doing 회원가입"}
      contentsWidth="450px"
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* 닉네임 */}
        <Input
          type="text"
          label="닉네임 *"
          errors={errors}
          {...register("nickname", {
            required: "닉네임을 입력해주세요",
            minLength: {
              value: 2,
              message: "닉네임은 2자리 이상이어야 합니다",
            },
          })}
        ></Input>

        {/* 이메일 */}
        <Input
          type="text"
          label="이메일 *"
          errors={errors}
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일 형식이 올바르지 않습니다",
            },
            validate: (value) => !value.includes("admin"),
          })}
        />
        {isAlreadyRegistered && (
          <ErrorMessage style={{ marginTop: "-13px", marginBottom: "18px" }}>
            이미 가입된 이메일입니다
          </ErrorMessage>
        )}

        {/* 비밀번호 */}
        <Input
          type="password"
          label="비밀번호 *"
          errors={errors}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "비밀번호는 6자리 이상이어야 합니다",
            },
          })}
        />

        <Input
          type="password"
          label="비밀번호 확인 *"
          errors={errors}
          {...register("passwordConfirm", {
            required: "비밀번호를 확인해주세요",
          })}
        />

        {/* 자기소개 */}
        <Textarea
          label="자기소개"
          errors={errors}
          {...register("selfIntroduction")}
        />

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

        {/* 회원가입 */}
        <Button
          type="submit"
          width="100%"
          height="50px"
          buttonType="primary"
          disabled={isLoading}
          rounded
        >
          {isLoading ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>
    </MainTemplate>
  );
}

export default Register;
