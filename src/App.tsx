import React, { use, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useGroups } from "./apis/groups";

// const Home = React.lazy(() => import("./pages/Home"));
// const StudyGroup = React.lazy(() => import("./pages/StudyGroup"));
// const MyLounge = React.lazy(() => import("./pages/MyLounge"));
// const Login = React.lazy(() => import("./pages/Login"));
// const Register = React.lazy(() => import("./pages/Register"));

import Home from "./pages/Home";
import StudyGroup from "./pages/StudyGroup";
import MyLounge from "./pages/MyLounge";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GroupRecruit from "./pages/group/GroupRecruit";
import GroupDetail from "./pages/group/GroupDetail";
import { useComments } from "./apis/comments";
import { useRecoilState } from "recoil";
import { userState } from "./atoms/userState";
import GroupEdit from "./pages/group/GroupEdit";

function App() {
  // 유저 정보 불러오기
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 파이어베이스 게시글 & 댓글 불러오기
  useGroups();
  useComments();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 스터디 그룹  */}
        <Route path="/studygroup" element={<StudyGroup />} />
        <Route path="/studygroup/recruit" element={<GroupRecruit />} />
        <Route path="/studygroup/edit/:id" element={<GroupEdit />} />
        <Route path="/studygroup/:id" element={<GroupDetail />} />

        <Route path="/lounge/my" element={<MyLounge />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
