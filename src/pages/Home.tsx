import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userState";
import MainTemplate from "../components/templates/MainTemplate.tsx";

function Home() {
  const [globalUser, setGlobalUser] = useRecoilState(userState);

  console.log(globalUser);

  return <MainTemplate> 홈 </MainTemplate>;
}

export default Home;
