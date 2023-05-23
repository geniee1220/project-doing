import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useGroups } from "./apis/groups";

const Home = React.lazy(() => import("./pages/Home"));
const StudyGroup = React.lazy(() => import("./pages/StudyGroup"));
const MyLounge = React.lazy(() => import("./pages/MyLounge"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const GroupRecruit = React.lazy(() => import("./pages/group/GroupRecruit"));
const GroupDetail = React.lazy(() => import("./pages/group/GroupDetail"));

import { useComments } from "./apis/comments";

import GroupEdit from "./pages/group/GroupEdit";
import Loader from "./components/atoms/Loader";

function App() {
  // 파이어베이스 게시글 & 댓글 불러오기
  useGroups();
  useComments();

  return (
    <>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </>
  );
}

export default App;
