import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Chat from "./components/Chat";
import { QueryClientProvider, QueryClient } from "react-query";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile";
import VideoCall from "./components/VideoCall";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Start from "./components/Start";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video-call/:chatId" element={<VideoCall />} />

        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
    </QueryClientProvider>
  );
}
