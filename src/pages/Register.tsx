import React, { useState } from "react";

// react-query
import { useMutation } from "react-query";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// react-router
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";

// components
import MainTemplate from "../components/templates/MainTemplate.tsx";

interface UserProps {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  selfIntroduction?: string;
}

function Register() {
  const firebaseStore = "users";
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserProps>({ mode: "onBlur" });

  const registerUser = async (user: UserProps) => {
    const emailExists = await getDocs(
      query(collection(db, firebaseStore), where("email", "==", user.email))
    );
    if (!emailExists.empty) {
      setIsAlreadyRegistered(true);
    }

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
    });
    return firebaseUser;
  };

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      setIsRegistered(true);
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
      });

      if (isRegistered) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <MainTemplate>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* 닉네임  */}
        <input
          type="text"
          placeholder="닉네임"
          {...register("nickname", {
            required: "닉네임을 입력해주세요",
            minLength: {
              value: 2,
              message: "닉네임은 2자리 이상이어야 합니다",
            },
          })}
        />
        <span>{errors?.nickname?.message as string}</span>

        {/* 이메일 */}
        <input
          type="text"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일 형식이 올바르지 않습니다",
            },
            validate: (value) => !value.includes("admin"),
          })}
        />
        <span>{errors?.email?.message as string}</span>
        {isAlreadyRegistered && "이미 가입된 이메일입니다"}

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "비밀번호는 6자리 이상이어야 합니다",
            },
          })}
        />
        <span>{errors?.password?.message as string}</span>

        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm")}
        />
        <span>{errors?.passwordConfirm?.message as string}</span>

        {/* 자기소개 */}
        <input placeholder="자기소개" {...register("selfIntroduction")} />

        {/* 제출 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </MainTemplate>
  );
}

export default Register;
