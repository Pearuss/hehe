import React, { useEffect, useState } from "react";
import { getToken } from "../utils/firebase";
import "react-notifications/lib/notifications.css";
import { TextField, Typography, Button } from "@mui/material";
import ButtonLoading from "./ButtonLoading";
import { pushNotiToken } from "../service";
import { useNavigate } from "react-router";

const App = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({ body: "", title: "" });
  const [validate, setValidate] = useState({ body: false, title: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "ftitle") {
      setValidate((validate) => ({ ...validate, title: false }));
      setData((data) => ({ ...data, title: e.target.value }));
    } else if (name === "fbody") {
      setValidate((validate) => ({ ...validate, body: false }));
      setData((data) => ({ ...data, body: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && data.title && data.body) {
      setValidate({ body: false, title: false });
      pushNotiToken(data.title, data.body, [token]);
      setData({ body: "", title: "" });
    } else {
      if (!data.title) {
        setValidate((validate) => ({ ...validate, title: true }));
      }
      if (!data.body) {
        setValidate((validate) => ({ ...validate, body: true }));
      }
    }
  };

  useEffect(() => {
    getToken(setToken);
  }, []);

  const goToTopicPage = (e) => {
    navigate("/topic");
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

          <Typography
            align="center"
            variant="h6"
            className="mt-6 mb-3 text-[#516775] font-[700]"
          >
            Notifications by tokens
          </Typography>
          <TextField
            inputProps={{ style: { height: "23px", color: "#3D5170" } }}
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
            inputProps={{ style: { height: "23px", color: "#3D5170" } }}
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

export default App;
