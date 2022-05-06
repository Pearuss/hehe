import React from "react";
import { timeAgo } from "../utils/helper";

function MessageImage({ message, profile, chattingUser }) {
  const isSelfMessage = profile._id === message?.from;

  // const url = message.data?.public_url;
  const filename = message?.fileId?.fileName;

  const avatar = `${process.env.REACT_APP_SERVER}/avatars/${chattingUser?.avatar}`;
  const url = `${process.env.REACT_APP_SERVER}/files/${filename}`;
  const backupUrl = `https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80`;

  const openFile = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
  return (
    <div className="flex items-center mb-4 ml-auto w-full">
      {!isSelfMessage && (
        <div className="flex items-start mt-1">
          <div className="w-[40px] h-[40px]">
            <img
              src={chattingUser?.avatar ? avatar : backupUrl}
              alt="imgUser"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex items-start ml-3">
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
            <span className="text-[10px] font-[500] text-[#a3a6aa] ml-2 relative top-[4px]">
              {timeAgo(new Date(message.createdAt))}
            </span>
          </div>
        </div>
      )}
      {isSelfMessage && (
        <div className="text-[13px] ml-auto">
          <div
            onClick={openFile}
            className="h-[200px] w-auto ml-auto  my-2 rounded-md  flex cursor-pointer"
          >
            <img
              src={
                filename
                  ? url
                  : "https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
              }
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
