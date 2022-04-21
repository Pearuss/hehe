import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate, useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import FollowTopic from "./components/FollowTopic";
import TokenNoti from "./components/TokenNoti";
import TopicNoti from "./components/TopicNoti";
import UnfollowTopic from "./components/UnfollowTopic";
import Home from "./Home";
import { onMessageListener } from "./utils/firebase";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [noti, setNoti] = useState(false);
  function topicOnUserMessageHandler(message) {
    NotificationManager.success(
      message.notification.body,
      message.notification.title
    );
  }

  const gotoHome = () => {
    navigate("/");
  };

  onMessageListener()
    .then((payload) => {
      topicOnUserMessageHandler({
        notification: {
          body: payload.notification.body,
          title: payload.notification.title,
        },
      });
      setTimeout(() => {
        setNoti(!noti);
      }, 1000);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="relative">
      <NotificationContainer />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/token" element={<TokenNoti />} />
        <Route path="/topic" element={<TopicNoti />} />
        <Route path="/follow-topic" element={<FollowTopic />} />
        <Route path="/unfollow-topic" element={<UnfollowTopic />} />
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/chat" && (
        <Button
          variant="contained"
          type="submit"
          className="absolute bottom-2 left-2 rounded-2xl px-10 py-[9px] bg-transparent text-blue-800"
          onClick={gotoHome}
        >
          Home
        </Button>
      )}
    </div>
  );
}
