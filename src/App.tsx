import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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

import { auth } from "../firebase";

console.log(auth);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-group" element={<StudyGroup />} />
        <Route path="/my-lounge" element={<MyLounge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
