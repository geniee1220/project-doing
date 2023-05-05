import React, { useRef, useState } from "react";

// recoil
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState, isAuthenticatedState } from "../atoms/userState";

// react-query
import { useMutation } from "react-query";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

import { useForm } from "react-hook-form";

// components
import MainTemplate from "../components/templates/MainTemplate.tsx";
import Input from "../components/atoms/Form/Input/index.tsx";
import Button from "../components/atoms/Button/index.tsx";
import ErrorMessage from "../components/atoms/Message/ErrorMessage/index.tsx";

interface UserProps {
  nickname: string;
  email: string;
  password: string;
  selfIntroduction?: string;
}

function Login() {
  const firebaseStore = "users";
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  const [globalUser, setGlobalUser] = useRecoilState(userState);
  const [isAuthenticated, setIsAuthenticatedState] =
    useRecoilState(isAuthenticatedState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserProps>({ mode: "onBlur" });

  const loginUser = async (user: UserProps) => {
    const emailExists = await getDocs(
      query(collection(db, firebaseStore), where("email", "==", user.email))
    );

    if (emailExists.empty) {
      setIsRegistered(false);
    }

    // const firebaseUser = await signInWithEmailAndPassword(
    //   auth,
    //   user.email,
    //   user.password
    // );

    // const userDoc = await getDoc(
    //   doc(db, firebaseStore, firebaseUser.user?.uid)
    // );
    // const userData = userDoc.data();

    // console.log("유저", user);
    // console.log(userData);

    // setGlobalUser({
    //   nickname: user.nickname,
    //   email: user.email,
    //   password: user.password,
    //   selfIntroduction: user.selfIntroduction,
    // });

    // setIsAuthenticatedState(true);
    // localStorage.setItem("isAuthenticated", "true");
    // console.log(globalUser);
    // navigate("/");

    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const userDoc = await getDoc(
        doc(db, firebaseStore, firebaseUser.user?.uid)
      );
      const userData = userDoc.data();

      console.log("유저", user);
      console.log(userData);

      setGlobalUser({
        nickname: user.nickname,
        email: user.email,
        password: user.password,
        selfIntroduction: user.selfIntroduction,
      });

      setIsRegistered(true);
      setIsAuthenticatedState(true);
      localStorage.setItem("isAuthenticated", "true");
      console.log(globalUser);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setIsRegistered(false);
      } else {
        console.log(error);
      }
    }
  };

  const { mutate, isLoading } = useMutation(loginUser);

  const onValid = (data: UserProps) => {
    mutate(data);
  };

  return (
    <MainTemplate
      pageName={"login"}
      pageTitle={"Doing 로그인"}
      contentsWidth="400px"
    >
      <form onSubmit={handleSubmit(onValid)}>
        {/* 이메일 */}
        <Input
          type="text"
          height="46px"
          placeholder="이메일"
          errors={errors}
          {...register("email")}
        ></Input>

        {/* 비밀번호 */}
        <Input
          type="password"
          height="46px"
          placeholder="비밀번호"
          errors={errors}
          {...register("password")}
        />

        <Button
          type="submit"
          width="100%"
          height="50px"
          buttonType="primary"
          rounded={true}
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>

        {isRegistered === false && (
          <ErrorMessage
            style={{
              marginTop: "4px",
            }}
          >
            이메일 혹은 비밀번호가 일치하지 않습니다.
          </ErrorMessage>
        )}
      </form>
    </MainTemplate>
  );
}

export default Login;
