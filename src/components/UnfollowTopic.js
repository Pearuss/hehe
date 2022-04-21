import React, { useEffect, useState } from "react";
import { getToken } from "../utils/firebase";
import {
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { TextField, Typography, Button } from "@mui/material";
import ButtonLoading from "./ButtonLoading";
import { unFollowTopics } from "../service";

const Index = () => {
  const [token, setToken] = useState("");
  const [topic, setTopic] = useState("");
  const [validate, setValidate] = useState(false);

  const handleChange = (e) => {
    setValidate(false);
    const name = e.target.name;
    if (name === "ftopic") {
      setTopic(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(token && topic) {
      setValidate(false);
      unFollowTopics([token], topic);
      setTopic("");
    } else {
      setValidate(true);
    }
  };

  useEffect(() => {
    getToken(setToken);
  }, []);

  const goToTopicPage = (e) => {
    e.preventDefault();
    window.location.href = "/topic";
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://sso.hybrid-technologies.co.jp/auth/resources/4.2.1.final/login/eas/img/background/bg_login_page.jpg)`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
      <NotificationContainer />
      <div className="flex items-center justify-center w-full h-full">
        <form
          onSubmit={handleSubmit}
          style={{
            background: `#D3E2E3`,
            backgroundImage: `linear-gradient(
        to top,
        rgba(211, 226, 227, 0.8) 0,
        rgba(211, 226, 227, 0) 60%,
        rgba(211, 226, 227, 0.8) 100%
      )`,
          }}
          className="w-[500px] h-[580px] box-border !bg-transparent px-16 py-10 rounded-md md:h-full"
        >
          <div className="flex items-center justify-center mx-auto">
            <img
              src={`https://hyknow.hybrid-technologies.co.jp/uploads/static/images/logo_login2.png`}
              alt="Logo login"
              className="w-[360px] h-[85px]"
            />
          </div>

          <Typography align="center" variant="h6" className="mt-6 mb-3 text-[#516775] font-[700]">
            Unfollow topic
          </Typography>
          <TextField
            inputProps={{ style: { height: "23px", color: "#3D5170" } }}
            variant="outlined"
            label={"Topic"}
            error={validate}
            placeholder="Enter topic"
            className="mt-5"
            fullWidth
            name="ftopic"
            onChange={handleChange}
            value={topic}
          />

          <ButtonLoading
            messageLoading="Processing..."
            // isLoading={isLoading}
            variant="contained"
            type="submit"
            className="rounded-3xl block mx-auto mt-12 px-10 py-[9px] text-white active:animate-jelly hover:animate-jelly"
          >
            Send
          </ButtonLoading>
        </form>
        <Button
          // isLoading={isLoading}
          variant="contained"
          type="submit"
          className="absolute bottom-2 right-2 rounded-2xl px-10 py-[9px] bg-transparent text-blue-800"
          onClick={goToTopicPage}
        >
          Go send by topic
        </Button>
      </div>
    </div>
  );
};

export default Index;
