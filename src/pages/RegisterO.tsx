import React, { useState } from "react";

// react-query
import { useMutation } from "react-query";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

// react-router
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";

// components
import MainTemplate from "../components/templates/MainTemplate.tsx";

interface UserProps {
  nickname: string;
  email: string;
  password: string;
  selfIntroduction?: string; // Optional field
}

function Register() {
  const firebaseStore = "users";
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProps>({
    nickname: "",
    email: "",
    password: "",
    selfIntroduction: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (user: UserProps) => {
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

  const { mutate, isLoading } = useMutation(registerUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
    navigate("/login");
  };

  return (
    <MainTemplate>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          onChange={handleInputChange}
          value={user.nickname}
        />
        <input
          placeholder="이메일"
          name="email"
          onChange={handleInputChange}
          value={user.email}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={handleInputChange}
          value={user.password}
        />
        <input
          placeholder="자기소개 (선택)"
          name="selfIntroduction"
          onChange={handleInputChange}
          value={user.selfIntroduction}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </MainTemplate>
  );
}

export default Register;
