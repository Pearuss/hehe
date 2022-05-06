import React from "react";
import { timeAgo } from "../utils/helper";
import { ImageConfig } from "../utils/ImageConfig";
import { truncate } from "../utils/helper";

function MessageFile({ message, profile, chattingUser }) {
  const isSelfMessage = profile._id === message.from;

  const fileOriginName = message?.fileId?.originalFilename;
  const filename = message?.fileId?.fileName;
  const type = fileOriginName?.split(".").pop() || null;

  const avatar = `${process.env.REACT_APP_SERVER}/avatars/${chattingUser?.avatar}`;
  const url = `${process.env.REACT_APP_SERVER}/files/${filename}`;
  const backupUrl = `https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80`;

  // console.log(avatar);

  const openFile = (e) => {
    e.preventDefault();
    // const url = message.data?.public_url;
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
          <div className="flex items-start ml-3 relative bottom-1">
            <div
              onClick={openFile}
              style={{ wordBreak: "break-word" }}
              className="w-[220px] mr-auto h-auto my-2 p-2 rounded-md bg-[#202225] flex items-center cursor-pointer hover:opacity-70"
            >
              <img
                src={ImageConfig[type] || ImageConfig["default"]}
                className="w-12 object-cover pointer mr-2"
                alt=""
              />
              <div className=" pointer text-[13px] mr-auto">
                <span>{truncate(fileOriginName, 40)}</span>
              </div>
            </div>
            <span className="text-[10px] font-[500] text-[#a3a6aa] ml-2 relative top-[6px]">
              {timeAgo(new Date(message.createdAt))}
            </span>
          </div>
        </div>
      )}
      {isSelfMessage && (
        <div className="text-[13px] ml-auto">
          <div
            onClick={openFile}
            style={{ wordBreak: "break-word" }}
            className="w-[220px] ml-auto h-auto my-2 p-2 rounded-md bg-[#202225] flex items-center cursor-pointer hover:opacity-70"
          >
            <img
              src={ImageConfig[type] || ImageConfig["default"]}
              className="w-12 object-cover pointer mr-2"
              alt=""
            />
            <div className=" pointer text-[13px] mr-auto">
              <span>{truncate(fileOriginName, 40)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageFile;
