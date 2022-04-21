import React from "react";
import { timeAgo } from "../utils/helper";

function MessageText({ message, user }) {
  const isSelfMessage = message.sender === user;
  const avatar =
    message.sender === "User 1" ? 1 : message.sender === "User 2" ? 2 : 3;

  // console.log(message?.data?.public_url);
  return (
    <div className="flex items-center mb-4 ml-auto w-full">
      {!isSelfMessage && (
        <div className="flex items-center mt-1">
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
            <p className="text-[#dcddde] text-[12.4px] whitespace-pre-wrap">
              {message.message}
            </p>
          </div>
        </div>
      )}
      {isSelfMessage && (
        <div className="text-[#dcddde] text-[13px] ml-auto bg-[#202225] py-2 px-6 rounded-3xl whitespace-pre-wrap ">
          {`${message.message}`}
        </div>
      )}
    </div>
  );
}

export default MessageText;
