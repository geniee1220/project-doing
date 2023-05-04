import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { userState, isAuthenticatedState } from "../atoms/userState";
import MainTemplate from "../components/templates/MainTemplate.tsx";

interface UserProps {
  nickname: string;
  email: string;
  password: string;
  selfIntroduction?: string;
}

function Login() {
  const firebaseStore = "users";
  const [user, setUser] = useState<UserProps>({
    nickname: "",
    email: "",
    password: "",
    selfIntroduction: "",
  });
  const [globalUser, setGlobalUser] = useRecoilState(userState);
  const [isAuthenticated, setIsAuthenticatedState] =
    useRecoilState(isAuthenticatedState);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (user: UserProps) => {
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

    setIsAuthenticatedState(true);
    localStorage.setItem("isAuthenticated", "true");
    console.log(globalUser);
    navigate("/");
  };

  const { mutate, isLoading } = useMutation(loginUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <MainTemplate>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </MainTemplate>
  );
}

export default Login;
