import React from "react";
import { timeAgo } from "../utils/helper";
import { ImageConfig } from "../utils/ImageConfig";

function MessageFile({ message, user }) {
  const isSelfMessage = message.sender === user;
  const avatar =
    message.sender === "User 1" ? 1 : message.sender === "User 2" ? 2 : 3;

  const type = message?.data?.content_type?.split("/")[1] || null;
  const openFile = (e) => {
    e.preventDefault();
    const url = message?.data?.public_url;
    window.open(url, "_blank");
  };
  return (
    <div className="flex items-center mb-4 ml-auto w-full">
      {!isSelfMessage && (
        <div className="flex items-start mt-1">
          <div className="w-[40px] h-[40px]">
            <img
              src={`https://i.pravatar.cc/100?img=${avatar}`}
              alt="imgUser"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start ml-3">
            <div className="flex items-center">
              <span className="font-[500] text-[15px] mr-2">
                {message.sender}
              </span>
              <span className="text-[10px] font-[500] text-[#a3a6aa] m-1">
                {timeAgo(new Date(message.sent_time))}
              </span>
            </div>
            <p className="text-[#dcddde] text-[12.4px] whitespace-pre-wrap my-1">
              {message.message}
            </p>
            <div
              onClick={openFile}
              style={{ wordBreak: "break-word"}} className="w-[220px] mr-auto h-auto my-2 p-2 rounded-md bg-[#202225] flex items-center pointer"
            >
              <img
                src={ImageConfig[type] || ImageConfig["default"]}
                className="w-12 object-cover pointer mr-2"
                alt=""
              />
              <div className=" pointer text-[13px] mr-auto">
                <span>{message?.data?.filename}</span>
              </div>
            </div>
            <p></p>
          </div>
        </div>
      )}
      {isSelfMessage && (
        <div className="text-[13px] ml-auto">
          <div className="text-[#dcddde]  w-max ml-auto bg-[#202225] py-2 px-6 rounded-3xl whitespace-pre-wrap ">
            {`${message.message}`}
          </div>
          {type && (
            <div
              onClick={openFile}
              style={{ wordBreak: "break-word"}} className="w-[220px] ml-auto h-auto my-2 p-2 rounded-md bg-[#202225] flex items-center pointer"
            >
              <img
                src={ImageConfig[type] || ImageConfig["default"]}
                className="w-12 object-cover pointer mr-2"
                alt=""
              />
              <div className=" pointer text-[13px] mr-auto">
                <span>{message?.data?.filename}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageFile;
