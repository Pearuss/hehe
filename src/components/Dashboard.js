/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import _ from "lodash";
import { io } from "socket.io-client";
import Filter from "bad-words-relaxed";

// hooks
import useToggle from "../hooks/useToggle";
import { useProfile } from "../hooks/useProfile";
import { useChat } from "../hooks/useChat";
import { useMessage } from "../hooks/useMessage";

// external

import Emoji from "./Emoji";
import MessageText from "./MessageText";
import MessageFile from "./MessageFile";
import MessageImage from "./MessageImage";
import badWord from "../badWord.json";
import { ImageConfig } from "../utils/ImageConfig";
import { convertEnglish } from "../utils/helper";

import chatApi from "../services/chatApi";
import { CircularProgress } from "@mui/material";

// icon
import UploadIcon from "@mui/icons-material/Upload";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import VideocamIcon from "@mui/icons-material/Videocam";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SendIcon from "@mui/icons-material/Send";
import CallVideoDialog from "./Common/CallVideoDialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import FolderIcon from "@mui/icons-material/Folder";

function Dashboard() {
  const navigate = useNavigate();
  let enterTarget = null;

  const inputRef = createRef();
  const wrapperRef = useRef(null);
  const fileUploadRef = useRef();
  const messagesEndRef = useRef();

  const [roomId, setRoomId] = useState(null);
  const [chattingUserId, setChattingUserId] = useState(null);
  const [chattingUser, setChattingUser] = useState(null);
  const [reply, setReply] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [nameCall, setNameCall] = useState("");
  const [idCall, setIdCall] = useState(null);
  const [openFolder, setOpenFolder] = useToggle(null);
  const [allFolder, setAllFolder] = useState(null);

  console.log(allFolder);

  const { listRoomChat, refetchListRoom } = useChat();
  const { allMessageRoom, refetch, isLoading } = useMessage(roomId);
  const { profile } = useProfile();
  const backupUrl = `https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80`;

  // console.log(allMessageRoom);

  const filter = new Filter();
  filter.addWords([...badWord]);

  const [inputValue, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [showInputAddGroup, setShowInputAddGroup] = useToggle(false);
  const [showEmoji, setShowEmoji] = useState(false);
  // const [showWrapper, setShowWrapper] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    if (allMessageRoom) {
      const allFile = allMessageRoom.filter(
        (message) => message.msgType === "file"
      );
      setAllFolder(allFile);
    }
  }, [allMessageRoom]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);
    socket.on("callReceived", (id, name) => {
      console.log(`${name} is calling you on ${id}`);
      setNameCall(name);
      setIdCall(id);
      setShowCallDialog(true);
    });
    if (chattingUserId) {
      // const socket = io(process.env.REACT_APP_SOCKET);
      const token = localStorage.getItem("access_token");
      socket.emit("initChat", token);

      socket.on("newMessages", async (message) => {
        if (message.chatId === roomId || chattingUserId) {
          setSearchValue("");
          if (roomId) {
            await refetch();
          }
          await refetchListRoom();
        }
      });
    }
    return () => {
      socket.emit("forceDisconnect");
    };
  }, [chattingUserId]);

  const typeFile = [
    "pdf",
    "docx",
    "xlsx",
    "png",
    "jpg",
    "jpeg",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const onCallVideo = async () => {
    const chatData = {
      msgType: "call",
      content: "Video Call",
    };
    const res = await chatApi.videoCall(chattingUserId, { data: chatData });
    console.log(res);
    window.open(`/video-call/${res.id}`);
  };

  const type = inputFile?.type?.split("/")[1];

  const triggerShowUploadFile = () => {
    fileUploadRef.current.click();
  };
  const onSelectFile = (e) => {
    const newFile = e.target.files[0];

    if (newFile && typeFile.includes(newFile.type.split("/")[1])) {
      setInputFile(newFile);
    } else {
      alert("File không hợp lệ");
      return;
    }
  };

  const pickEmoji = (e, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();
    const start = inputValue.substring(0, ref.selectionStart);
    const end = inputValue.substring(ref.selectionStart);
    const text = start + emoji + end;
    setInputValue(text);
    inputRef.current.selectionEnd = cursorPosition;
    setCursorPosition(start.length + emoji.length);
  };

  const handleShowEmoji = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  const onDragEnter = (e) => {
    enterTarget = e.target;
    wrapperRef.current.classList.add("flex");
    wrapperRef.current.classList.remove("hidden");
  };

  const onDragLeave = (e) => {
    if (enterTarget === e.target) {
      wrapperRef.current.classList.add("hidden");
      wrapperRef.current.classList.remove("flex");
    }
  };

  const onDrop = () => {
    wrapperRef.current.classList.add("hidden");
    wrapperRef.current.classList.remove("flex");
  };

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendMessage = async (e) => {
    // e.preventDefault();
    if (inputValue.trim().length === 0 && !inputFile) return;

    const payload = {
      chattingUserId: chattingUserId,
      data: {
        msgType: "text",
        content: convertEnglish(filter.clean(inputValue)),
        replyToId: reply?.message._id || null,
      },
    };
    if (inputValue.trim().length > 0) {
      try {
        await chatApi.sendMessage(payload);
        setInputValue("");
        // refetch();
      } catch (error) {
        console.log(error);
      }
    }

    if (inputFile) {
      const token = localStorage.getItem("access_token");
      const url = `http://localhost:5000/api/chat/${chattingUserId}/file`;
      const formData = new FormData();
      formData.append("uploadedFile", inputFile);
      console.log(...formData);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          authorization: "Bearer " + token,
        },
      };
      const res = await axios.post(url, formData, config);
      console.log(res);
      setInputFile(null);
    }
    setReply(null);
  };

  const inputSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);

    _.debounce(async () => {
      const res = await chatApi.searchUser(e.target.value);
      setSearchUser(res);
    }, 500)();
  };
  return (
    <div className="h-screen flex-1 flex items-center text-white relative">
      <div className="w-[240px] bg-[#2F3136] h-full relative">
        <div className="flex justify-between my-5 px-3">
          <Link to={"/"}>
            <h4 className="text-[16px] font-[600]">Chat Technologies</h4>
          </Link>
          <KeyboardArrowDownOutlinedIcon className="h-4 relative top-1" />
        </div>
        <div className=" h-[1.5px] bg-black w-full absolute top-[62.5px]"></div>
        <div className="flex h-[48px] items-center justify-between my-auto px-3 text-[#dcddde] uppercase relative">
          <h4 className="text-[11.5px]  font-[600] uppercase">Text Channels</h4>
          <AddOutlinedIcon
            className="h-4 cursor-pointer hover:opacity-70"
            onClick={setShowInputAddGroup}
          />

          {showInputAddGroup && (
            <input
              type="text"
              className="absolute left-[240px] bottom-[-10px] z-40 bg-[#2F3136] border-2 border-[#202225] outline-none px-3 py-1 rounded-md w-[250px]"
              value={searchValue}
              onChange={inputSearchChangeHandler}
            />
          )}
        </div>
        {searchUser.length > 0 &&
          searchValue.length > 0 &&
          searchUser?.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setChattingUserId(user._id);
                setChattingUser(user);
              }}
              className={`flex h-[42px] items-center  ${
                chattingUserId === user._id ? "bg-[#40444B]" : " bg-transparent"
              } px-2 mx-2 mt-2 text-[#dcddde] cursor-pointer rounded`}
            >
              <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
              <div className="font-[500] text-[13px] mr-auto  ml-2">
                {user?.username}
              </div>
            </div>
          ))}
        {(searchUser.length === 0 || searchValue.length === 0) &&
          listRoomChat?.map((chat, index) => {
            // console.log(roomId === chat._id);
            if (chat.user1[0]._id === profile._id) {
              const { username } = chat.user2[0];
              // console.log(chat.user2[0]);

              return (
                <div
                  key={index}
                  onClick={() => {
                    setRoomId(chat._id);
                    setChattingUserId(chat.user2[0]._id);
                    if (chat.user2[0]) {
                      setChattingUser(chat.user2[0]);
                    }
                  }}
                  className={`flex h-[42px] items-center px-2 mx-2 mt-0 text-[#dcddde] cursor-pointer ${
                    roomId === chat._id ? "bg-[#40444B]" : " bg-transparent"
                  }  rounded`}
                >
                  <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
                  <div className="font-[500] text-[13px] relative bottom-[1px] mr-auto mt-[2px] ml-2">
                    {username}
                  </div>
                </div>
              );
            } else {
              const { username } = chat.user1[0];
              // console.log(chat.user1[0]);
              return (
                <div
                  onClick={() => {
                    setRoomId(chat._id);
                    setChattingUserId(chat.user1[0]._id);
                    if (chat.user1[0]) {
                      setChattingUser(chat.user1[0]);
                    }
                  }}
                  key={index}
                  className={`flex h-[42px] items-center px-2 mx-2 mt-0 text-[#dcddde] cursor-pointer ${
                    roomId === chat._id ? "bg-[#40444B]" : " bg-transparent"
                  } rounded`}
                >
                  <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
                  <div className="font-[500] text-[13px] mr-auto mt-[2px] ml-2">
                    {username}
                  </div>
                </div>
              );
            }
          })}
        <div className="flex items-center px-3 h-[52px] rounded bg-[#292b2f] absolute bottom-0 left-0 right-0 ">
          <div
            onClick={() => navigate("/profile")}
            className="w-[32px] h-[32px] cursor-pointer"
          >
            <img
              src={
                profile?.avatar
                  ? `${process.env.REACT_APP_SERVER}/avatars/${profile.avatar}`
                  : `${backupUrl}`
              }
              alt="imgUser"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col ml-1">
            <span
              onClick={() => navigate("/profile")}
              className="text-[14px] cursor-pointer font-[500] pl-2 relative bottom-1"
            >
              {profile?.username}
            </span>
            <CircleIcon
              className={`h-[10px]  ml-1 `}
              color={profile?.isOnline ? "success" : "success"}
            />
          </div>
          <LogoutIcon
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/login", { replace: true });
            }}
            className="h-[22px] cursor-pointer ml-auto"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full bg-[#32353B] relative">
        <div
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          // onDragEnter={(e) => {
          //   alert("e");
          //   console.log(e);
          // }}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          className={`absolute justify-center items-center h-full top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-40 z-10 hidden`}
        >
          <input
            className="w-full h-full opacity-0"
            type="file"
            value=""
            onChange={onSelectFile}
            // multiple
          />
          <div
            className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center`}
          >
            <UploadIcon color="info" sx={{ fontSize: "100px" }} />
            <p className="text-5xl">Upload file</p>
            <p className="text-xl">Drop file here to upload</p>
          </div>
        </div>
        <div className="flex justify-between  w-full items-center">
          <div className="flex items-center py-[19.5px]">
            <TagOutlinedIcon className="h-6 text-[#8e9297]" />
            <h3 className="ml-2 text-[15px] font-[600]">
              {chattingUser
                ? `${chattingUser?.username}, ${profile.username}`
                : "Chat group"}
            </h3>
          </div>
          <FolderSharedIcon
            className="h-5 cursor-pointer hover:opacity-70 ml-auto mr-4"
            onClick={setOpenFolder}
          />
          <VideocamIcon
            className="h-5 cursor-pointer hover:opacity-70 mr-4"
            onClick={onCallVideo}
          />
          <RefreshIcon
            className="h-5 cursor-pointer hover:opacity-70 mr-4"
            onClick={() => {
              messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
        <div className="h-[1.5px] bg-black w-full absolute top-[62.5px]"></div>
        <div className="flex flex-col-reverse overflow-y-auto">
          <div
            style={{ flexGrow: "1" }}
            className="messageClass mb-2 relative w-full flex flex-col px-3 pb-[80px] pt-4"
            onDragEnter={onDragEnter}
            id="messageList"
          >
            {isLoading && (
              <div className="flex items-center justify-center">
                <CircularProgress sx={{ color: "white !important" }} />
              </div>
            )}
            {allMessageRoom?.map((message) => {
              if (message.msgType === "text" || message.msgType === "call") {
                return (
                  <MessageText
                    key={message._id}
                    message={message}
                    profile={profile}
                    setReply={setReply}
                    chattingUser={chattingUser}
                  />
                );
              } else {
                if (
                  message?.fileId?.originalFilename.endsWith(".png") ||
                  message?.fileId?.originalFilename.endsWith(".jpg") ||
                  message?.fileId?.originalFilename.endsWith(".jpeg")
                ) {
                  // return;
                  return (
                    <MessageImage
                      key={message._id}
                      message={message}
                      profile={profile}
                      setReply={setReply}
                      chattingUser={chattingUser}
                    />
                  );
                } else {
                  return (
                    <MessageFile
                      key={message._id}
                      message={message}
                      profile={profile}
                      chattingUser={chattingUser}
                    />
                  );
                }
              }
            })}

            <div ref={messagesEndRef} className="relative top-[40px]" />
          </div>
        </div>

        {inputFile && (
          <div className="flex  w-[calc(100%-40px)] h-[100px] bg-[#40444B] absolute bottom-[4rem] left-4 rounded p-4">
            <div className="h-full max-w-[32%] flex items-center relative gap-2 pointer">
              <img
                src={ImageConfig[type] || ImageConfig["default"]}
                className="w-[100px] h-full object-cover pointer"
                alt=""
              />
              <div className="mt-6 pointer">
                <span>{inputFile.name}</span>
                <span>{inputFile.size}B</span>
              </div>
              <HighlightOffOutlinedIcon
                onClick={() => setInputFile(null)}
                className="absolute bottom-[calc(100%-10px)] left-[104px] text-red-400 h-6 pointer hover:opacity-50"
              />
            </div>
          </div>
        )}
        {reply?.message?._id && (
          <div className="flex flex-col  w-[calc(100%-40px)] h-auto bg-[#40444B] absolute bottom-[4rem] left-4 rounded px-3 py-1">
            <div className="flex items-center w-[100%] text-[14px] gap-2 mb-1">
              <span className="text-gray-400">Reply to </span>
              <span className="text-[#0e0e0e] font-medium">
                {reply?.isSelfReply ? "Your self" : "Test"}
              </span>
              <HighlightOffOutlinedIcon
                onClick={() => setReply(null)}
                className=" ml-auto text-red-400 h-4 pointer hover:opacity-50"
              />
            </div>
            <div className="text-[15px]">{reply?.message?.content}</div>
          </div>
        )}
        <div className="flex items-center absolute bottom-4 left-4 right-6 h-[46px] bg-[#40444B] rounded-lg px-3  text-[#dcddde]">
          <AddCircleOutlineOutlinedIcon
            className="h-6 cursor-pointer hover:opacity-70"
            onClick={triggerShowUploadFile}
          />
          <input
            ref={fileUploadRef}
            accept="*"
            type="file"
            onChange={onSelectFile}
            className=" hidden"
          />
          <input
            type="text"
            ref={inputRef}
            className="flex-1 bg-transparent w-full outline-none px-3 z-50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setInputValue(e.target.value);
                sendMessage();
              }
            }}
          />
          <SentimentSatisfiedAltIcon
            className="mr-4 cursor-pointer hover:opacity-80"
            onClick={handleShowEmoji}
          />
          <SendIcon
            className="h-6 cursor-pointer hover:opacity-80"
            onClick={() => sendMessage()}
          />
          {showEmoji && (
            <div className="absolute top-0 right-0 -translate-y-[105%] z-10">
              <Emoji pickEmoji={pickEmoji} />
            </div>
          )}
        </div>
      </div>
      {showEmoji && (
        <div
          onClick={handleShowEmoji}
          id="cover"
          className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0"
        ></div>
      )}
      {openFolder && (
        <div className="w-[20vw] absolute right-0 bottom-[62px] bg-[#292B2F] h-[calc(100vh-125px)] rounded-md overflow-y-hidden">
          <div className="font-medium text-xl mt-2 mb-6 mx-4 text-[#88888e] tracking-wider">
            {`Total file: ${allFolder?.length}`}
          </div>
          {allFolder?.map((file, index) => (
            <div
              key={index}
              style={{ wordBreak: "break-word" }}
              className=" h-auto bg-[#40444B] rounded mx-2 px-1 mt-2 flex items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const url = `${process.env.REACT_APP_SERVER}/files/${file?.fileId?.fileName}`;
                if (file?.fileId?.fileName) {
                  window.open(url, "_blank");
                }
              }}
            >
              <FolderIcon className="w-[50px] h-[50px] text-[#1c1a1a] mr-2" />
              <span className="text-[#88888e] text-[14px]">
                {file?.fileId?.originalFilename}
              </span>
            </div>
          ))}
        </div>
      )}
      <CallVideoDialog
        open={showCallDialog}
        setOpen={setShowCallDialog}
        callName={nameCall}
        idCall={idCall}
      />
    </div>
  );
}

export default Dashboard;
