import React from "react";
import { timeAgo } from "../utils/helper";

function MessageImage({ message, profile }) {
  const isSelfMessage = profile._id === message.from;
  const avatar = Math.floor(Math.random() * 6);

  const url = message.data?.public_url;

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
              className="h-[200px] w-auto mr-auto  my-2 rounded-md  flex pointer"
            >
              <img
                src={url}
                className="w-full h-full object-cover pointer mr-2"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {isSelfMessage && (
        <div className="text-[13px] ml-auto">
          {message.message.trim() !== "" && (
            <div className="text-[#dcddde]  w-max ml-auto bg-[#202225] py-2 px-6 rounded-3xl whitespace-pre-wrap ">
              {`${message.message}`}
            </div>
          )}

          <div
            onClick={openFile}
            className="h-[200px] w-auto ml-auto  my-2 rounded-md  flex pointer"
          >
            <img
              src={url}
              className="w-full h-full object-cover pointer mr-2"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageImage;
