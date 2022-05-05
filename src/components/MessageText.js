import { Tooltip } from "@mui/material";
import React from "react";
import { timeAgo } from "../utils/helper";
import ReplyIcon from "@mui/icons-material/Reply";

function MessageText({ message, profile, setReply }) {
  const isSelfMessage = profile._id === message.from;
  // const avatar =
  //   message.sender === "User 1" ? 1 : message.sender === "User 2" ? 2 : 3;

  const replyHandler = () => {
    setReply({ message, isSelfMessage });
  };
  return (
    <div
      className={`flex items-center mb-4 ml-auto w-full relative ${
        message?.replyToId?.content ? "my-5" : ""
      }`}
    >
      {message?.replyToId?.content && (
        <div
          className={`px-3 py-1 absolute top-[-26px]  bg-[#202225] opacity-60 rounded-xl text-sm ${
            isSelfMessage ? "ml-auto right-2" : "left-[64px] top-[-19px] mr-auto"
          }`}
        >
          {message?.replyToId?.content}
        </div>
      )}
      {!isSelfMessage && (
        <Tooltip
          title={
            <ReplyIcon
              className="h-[18px] cursor-pointer"
              onClick={replyHandler}
            />
          }
          placement="right"
        >
          <div className="flex items-center mt-1">
            <div className="w-[40px] h-[40px]">
              <img
                src={`https://i.pravatar.cc/100?img=1`}
                alt="imgUser"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex items-start ml-3">
              <p className="text-[#dcddde] bg-[#202225] py-2 px-6 rounded-3xl text-[12.4px] whitespace-pre-wrap">
                {message.content}
              </p>
              <span className="text-[10px] font-[500] text-[#a3a6aa] ml-2 relative top-[2px]">
                {timeAgo(new Date(message.createdAt))}
              </span>
            </div>
          </div>
        </Tooltip>
      )}
      {isSelfMessage && (
        <Tooltip
          title={
            <ReplyIcon
              className="h-[18px] cursor-pointer"
              onClick={replyHandler}
            />
          }
          placement="left"
        >
          <div className="text-[#dcddde] text-[13px] ml-auto bg-[#202225] py-2 px-6 rounded-3xl whitespace-pre-wrap ">
            {`${message?.content}`}
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default MessageText;
