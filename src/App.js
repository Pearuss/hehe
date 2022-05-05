import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Chat from "./components/Chat";
import { QueryClientProvider, QueryClient } from "react-query";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile";
import VideoCall from "./components/VideoCall";

const queryClient = new QueryClient();

export default function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // useEffect(() => {
  //   const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  //   console.log(isLoggedIn);
  //   if (isLoggedIn) {
  //     setIsLogin(isLoggedIn);
  //   }
  // }, []);

  // const isLogin = Boolean(localStorage.getItem("access_token"));
  // if (!isLogin) return <Navigate to="/login" />;
  // // const navigate = useNavigate();
  // console.log(isLoggedIn);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video-call/:chatId" element={<VideoCall />} />

        {/* <Route path="/chat" element={<Chat />} /> */}

        <Route path="/" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </QueryClientProvider>
  );
}
