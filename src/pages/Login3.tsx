import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { userState, UserParams } from "../atoms/userState";

function Login() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [user, setUserLogin] = useState<UserParams>({
    email: "",
    password: "",
    nickname: "",
    selfIntroduction: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (user: UserParams) => {
    await signInWithEmailAndPassword(auth, user.email, user.password);
    console.log("유저", user);
    const userDoc = await firestore.collection("users").doc(user.email).get();
    const userData = userDoc.data();
    const updatedUser = {
      email: user.email,
      nickname: userData?.nickname ?? "",
      selfIntroduction: userData?.selfIntroduction ?? "",
    };
    return updatedUser;
  };

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      setUser(data);
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={user.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={user.password}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default Login;
