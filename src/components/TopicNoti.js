import React, { useEffect, useState } from "react";
import {
  getToken,
} from "../utils/firebase";
import "react-notifications/lib/notifications.css";
import { TextField, Typography, Button } from "@mui/material";
import ButtonLoading from "./ButtonLoading";
import { pushNotiTopic } from "../service";

const App = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({ body: "", title: "", topic: "" });
  const [validate, setValidate] = useState({ body: false, title: false, topic: false });

  const handleChange = (e) => {
    const name = e.target.name;

    if (name === "ftitle") {
      setValidate((validate) => ({...validate, title: false}));
      setData((data) => ({ ...data, title: e.target.value }));
    } else if (name === "fbody") {
      setValidate((validate) => ({...validate, body: false}));
      setData((data) => ({ ...data, body: e.target.value }));
    } else if (name === "ftopic") {
      setValidate((validate) => ({...validate, topic: false}));
      setData((data) => ({ ...data, topic: e.target.value }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && data.body && data.title && data.topic) {
      setValidate({ body: false, title: false, topic: false });
      pushNotiTopic(data.title, data.body, data.topic);
      setData({ body: "", title: "", topic: "" });
    } else {
      if(!data.body) {
        setValidate((validate) => ({...validate, body: true}));
      }
      if(!data.title) {
        setValidate((validate) => ({...validate, title: true}));
      }
      if(!data.topic) {
        setValidate((validate) => ({...validate, topic: true}));
      }
    }
  };

  useEffect(() => {
    getToken(setToken);
  }, []);

  const goToTokenPage = (e) => {
    e.preventDefault();
    window.location.href = "/token";
  };

  const goToFollowTopic = (e) => {
    e.preventDefault();
    window.location.href = "/follow-topic";
  };

  const goToUnfollowTopic = (e) => {
    e.preventDefault();
    window.location.href = "/unfollow-topic";
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://sso.hybrid-technologies.co.jp/auth/resources/4.2.1.final/login/eas/img/background/bg_login_page.jpg)`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
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
            Notifications by topic
          </Typography>
          <TextField
            inputProps={{ style: { height: "21px", color: "#3D5170" } }}
            variant="outlined"
            label={"Title"}
            error={validate.title}
            placeholder="Enter notification's title"
            className="mt-5"
            fullWidth
            name="ftitle"
            onChange={handleChange}
            value={data.title}
          />

          <TextField
            inputProps={{ style: { height: "21px", color: "#3D5170" } }}
            variant="outlined"
            label={"Body"}
            error={validate.body}
            placeholder="Enter notification's  body"
            className="mt-5"
            fullWidth
            name="fbody"
            onChange={handleChange}
            value={data.body}
          />

          <TextField
            inputProps={{ style: { height: "21px", color: "#3D5170" } }}
            variant="outlined"
            label={"Topic"}
            error={validate.topic}
            placeholder="Enter topic"
            className="mt-5"
            fullWidth
            name="ftopic"
            onChange={handleChange}
            value={data.topic}
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
          onClick={goToTokenPage}
        >
          Go send by token
        </Button>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
        <Button
          // isLoading={isLoading}
          variant="contained"
          type="submit"
          className="rounded-2xl px-10 py-[9px] bg-transparent text-blue-800"
          onClick={goToFollowTopic}
        >
          Follow topic
        </Button>
        <Button
          // isLoading={isLoading}
          variant="contained"
          type="submit"
          className="rounded-2xl px-10 py-[9px] bg-transparent text-[#972631]"
          onClick={goToUnfollowTopic}
        >
          Unfollow
        </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
