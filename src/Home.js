import { Typography } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(https://sso.hybrid-technologies.co.jp/auth/resources/4.2.1.final/login/eas/img/background/bg_login_page.jpg)`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
      <div className="h-[100vh] w-full flex items-center justify-center">
        <div
          style={{
            background: `#D3E2E3`,
            backgroundImage: `linear-gradient(
        to top,
        rgba(211, 226, 227, 0.8) 0,
        rgba(211, 226, 227, 0) 60%,
        rgba(211, 226, 227, 0.8) 100%
      )`,
          }}
          className="text-center p-2 pt-5 bg-transparent border border-gray-400 p-10 border-solid rounded-lg"
        >
          <div className="flex items-center justify-center mx-auto mb-3">
            <img
              src={`https://hyknow.hybrid-technologies.co.jp/uploads/static/images/logo_login2.png`}
              alt="Logo login"
              className="w-[360px] h-[85px]"
            />
          </div>
          <Typography className="w-[20vw] text-[#000] font-medium text-3xl mb-2">
            Push notifications / Chat
          </Typography>
          <div className="border border-gray-400 border-solid">
            <div className="text-left text-xl p-2 pt-5 border-b border-gray-400 border-solid">
              <a className="hover:opacity-70" href="/token">Push notification</a>
            </div>
            <div className="text-left p-2 text-xl pt-5">
              <a className="hover:opacity-70" href="/chat">Chat</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
