import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { userState, UserParams } from "../atoms/userState";
import MainTemplate from "../components/templates/MainTemplate.tsx";

function Login() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [user, setUserLogin] = useState<UserParams>({
    email: "",
    password: "",
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
    return user;
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
    <MainTemplate>
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
    </MainTemplate>
  );
}

export default Login;
