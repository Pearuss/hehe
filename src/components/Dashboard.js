import React, { createRef, useEffect, useRef, useState } from "react";
import firebase from "../utils/firebase";
import { messageListen } from "../utils/firebase";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import useToggle from "../hooks/useToggle";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ImageConfig } from "../utils/ImageConfig";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import MessageText from "./MessageText";
import MessageFile from "./MessageFile";
import Filter from "bad-words-relaxed";
import badWord from "../badWord.json";
import { convertEnglish } from "../utils/helper";
import MessageImage from "./MessageImage";
import { useProfile } from "../hooks/useProfile";
import { useChat } from "../hooks/useChat";
import { io } from "socket.io-client";
import chatApi from "../services/chatApi";

function Dashboard({ user }) {
  const inputRef = createRef();
  const fileUploadRef = useRef();
  const messagesEndRef = useRef();
  const [roomId, setRoomId] = useState(null);
  const [chattingUserId, setChattingUserId] = useState(null);
  const [reply, setReply] = useState(null);

  const { listRoomChat, allMessageRoom, refetch } = useChat(roomId);
  const { profile } = useProfile();
  // console.log(profile);
  // console.log(listRoomChat);
  // console.log(chattingUserId);

  const filter = new Filter();
  filter.addWords([...badWord]);

  const [allMessage, setAllMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [inputAddGroupValue, setInputAddGroupValue] = useState("");
  const [showInputAddGroup, setShowInputAddGroup] = useToggle(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  // const [roomId, setRoomId] = useState("1");
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);
    // console.log(socket);
    const token = localStorage.getItem("access_token");
    // console.log(token);
    socket.emit("initChat", token);
    // socket.on("callReceived", (id, name) => {
    //   console.log(`${name} is calling you on ${id}`);
    //   // setNameCall(name);
    //   // setIdCall(id);
    //   // setShowCallDialog(true);
    // });
    socket.on("newMessages", async (message) => {
      if (message.chatId === roomId || (!roomId && chattingUserId)) {
        // console.log(message);
        await refetch();
        // dispatch(messageActions.addMoreMessage(message));
        // const scrollContainer = document.getElementById("messageList");
        // scrollContainer.scrollTo({
        //   top: scrollContainer.scrollHeight,
        //   left: 0,
        //   behavior: "smooth",
        // });
      }

      // const resChat = await fetchWithToken(
      //   `${process.env.REACT_APP_API_KEY}/chat`
      // );
      // const listChat = await resChat.json();
      // setListChat(listChat);
      // const cloneListChat = _.cloneDeep(listChat);
      // const updatedListChat = cloneListChat.map((chat) => {
      //   if (chat._id === message.chatId) {
      //     chat.messages[0] = message;
      //   }
      //   return chat;
      // });
      // setListChat(updatedListChat);

      // return () => {
      //   socket.emit("forceDisconnect");
      // };
    });
    return () => {
      socket.emit("forceDisconnect");
    };
  }, [roomId, chattingUserId]);

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
  // const fileBina = reader.readAsDataURL(inputFile);

  // console.log(allMessage);

  const type = inputFile?.type?.split("/")[1];

  // const getAllMessageRoom = (room) => {
  //   if (!room) return;
  //   firebase
  //     .database()
  //     .ref(`messages/room-${room}`)
  //     .once("value", function (snapshot) {
  //       // console.log(snapshot);
  //       const data = snapshot.val();
  //       if (!data) {
  //         setAllMessage([]);
  //         return;
  //       }

  //       const newArray = Object.keys(data)?.map((key) => data[`${key}`]);
  //       setAllMessage(newArray);
  //       const scrollContainer = document.getElementById("messageList");
  //       scrollContainer.scrollTo({
  //         top: scrollContainer.scrollHeight,
  //         left: 0,
  //         behavior: "smooth",
  //       });
  //       setInputValue("");
  //       const scrollContainer2 = document.querySelectorAll(".messageClass");
  //       scrollContainer2[1]?.scrollTo({
  //         top: scrollContainer.scrollHeight,
  //         right: 0,
  //         behavior: "smooth",
  //       });
  //       scrollContainer2[0]?.scrollTo({
  //         top: scrollContainer.scrollHeight,
  //         right: 0,
  //         behavior: "smooth",
  //       });
  //     });
  // };
  const triggerShowUploadFile = () => {
    fileUploadRef.current.click();
  };
  const onSelectFile = (e) => {
    const newFile = e.target.files[0];

    if (newFile && typeFile.includes(newFile.type.split("/")[1])) {
      setInputFile(newFile);
    } else {
      Swal.fire("File không hợp lệ");
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

  // useEffect(() => {
  //   messageListen(roomId, getAllMessageRoom);
  // }, [roomId]);

  // useEffect(() => {
  //   getAllMessageRoom(roomId);
  // }, [roomId]);

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendMessage = async (e) => {
    // e.preventDefault();
    if (inputValue.trim().length === 0) return;

    const payload = {
      chattingUserId: chattingUserId,
      data: {
        msgType: "text",
        content: inputValue,
        replyToId: reply?.id || null,
      },
    };

    try {
      await chatApi.sendMessage(payload);
      setInputValue("");
      // await refetch();
    } catch (error) {
      console.log(error);
    }

    // const formdata = new FormData();
    // formdata.append("roomId", roomIdSendMessage);
    // formdata.append("sender", user);
    // formdata.append("message", filter.clean(convertEnglish(inputValue)));
    // if (inputFile) {
    //   formdata.append("file", inputFile);
    // }

    // const data = await fetch(`${process.env.REACT_APP_API_URL}/chat/message`, {
    //   method: "POST",
    //   body: formdata,
    // });
    // if (data.status === 200) {
    //   setInputFile(null);
    //   const scrollContainer = document.getElementById("messageList");
    //   scrollContainer.scrollTo({
    //     top: scrollContainer.scrollHeight,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    //   const scrollContainer2 = document.querySelectorAll(".messageClass");
    //   scrollContainer2[1]?.scrollTo({
    //     top: 300000,
    //     right: 0,
    //     behavior: "smooth",
    //   });
    //   setInputValue("");
    // } else {
    //   alert("Fail!");
    // }
  };
  return (
    <div className="h-screen flex-1 flex items-center text-white">
      <div className="w-[240px] bg-[#2F3136] h-full">
        <div className="flex justify-between my-5 px-3">
          <Link to={"/"}>
            <h4 className="text-[15px] font-[600]">Hybrid Technologies</h4>
          </Link>
          <KeyboardArrowDownOutlinedIcon className="h-4" />
        </div>
        <div className="h-[1.5px] bg-black"></div>
        <div className="flex h-[48px] items-center justify-between my-auto px-3 text-[#dcddde] uppercase relative">
          <h4 className="text-[11.5px]  font-[600] uppercase">Text Channels</h4>
          <AddOutlinedIcon className="h-4" onClick={setShowInputAddGroup} />

          {/* {showInputAddGroup && (
            <input
              type="text"
              className="absolute left-[240px] bottom-[-10px] z-40 bg-[#2F3136] border-2 border-[#202225] outline-none px-3 py-1 rounded-md w-[250px]"
              value={inputAddGroupValue}
              onChange={(e) => setInputAddGroupValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (inputAddGroupValue.trim().length === 0) return;
                  setInputAddGroupValue(e.target.value);
                  setListRoom([...listRoom, inputAddGroupValue]);
                  setShowInputAddGroup(false);
                  setInputAddGroupValue("");
                }
              }}
            />
          )} */}
        </div>
        {listRoomChat?.map((chat, index) => {
          if (chat.user1[0]._id === profile._id) {
            const { avatar, username, isOnline, _id } = chat.user2[0];
            // console.log(chat.user2[0]);
            return (
              <div
                key={index}
                onClick={() => {
                  setRoomId(chat._id);
                  setChattingUserId(chat.user2[0]._id);
                }}
                className={`flex h-[42px] items-center px-2 mx-2 mt-0 text-[#dcddde] cursor-pointer bg-[#40444B] rounded`}
              >
                <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
                <div className="font-[500] text-[13px] mr-auto mt-[2px] ml-2">
                  {username}
                </div>
              </div>
              // <Card
              //   key={_id}
              //   onClick={() => getChatGroup(chat._id, chat.user2[0])}
              // >
              //   <img
              //     src={`${process.env.REACT_APP_SERVER}/avatars/${avatar}`}
              //     alt='user'
              //   />
              //   <div>
              //     <span>
              //       {username} <sup>{isOnline ? "Online" : "Offine"}</sup>
              //     </span>
              //     <span>{chat?.messages[0]?.content}</span>
              //   </div>
              //   <span>
              //     {moment(chat?.messages[0]?.createdAt).format("hh:mm")}
              //   </span>
              // </Card>
            );
          } else {
            const { avatar, username, isOnline, _id } = chat.user1[0];
            // console.log(chat.user1[0]);
            return (
              <div
                onClick={() => {
                  setRoomId(chat._id);
                  setChattingUserId(chat.user1[0]._id);
                }}
                key={index}
                className={`flex h-[42px] items-center px-2 mx-2 mt-0 text-[#dcddde] cursor-pointer bg-[#40444B] rounded`}
              >
                <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
                <div className="font-[500] text-[13px] mr-auto mt-[2px] ml-2">
                  {username}
                </div>
              </div>
              // <Card
              //   key={_id}
              //   onClick={() => getChatGroup(chat._id, chat.user1[0])}
              // >
              //   <img
              //     src={`${process.env.REACT_APP_SERVER}/avatars/${avatar}`}
              //     alt='user'
              //   />
              //   <div>
              //     <span>{username}</span>
              //     <span>{isOnline ? "Online" : "Offine"}</span>
              //   </div>
              //   <span>11:15</span>
              // </Card>
            );
          }
        })}
        {/* {listRoom?.map((room, index) => (
          <div
            key={index}
            onClick={() => {
              setRoomId((index + 1).toString());
            }}
            className={`flex h-[42px] items-center px-2 mx-2 mt-2 text-[#dcddde] cursor-pointer ${
              roomId === (index + 1).toString()
                ? "bg-[#40444B]"
                : "bg-transparent"
            } rounded`}
          >
            <TagOutlinedIcon className="h-5 text-[rgb(142,146,151)]" />
            <div className="font-[500] text-[13px] mr-auto mt-[2px] ml-2">
              {room}
            </div>
          </div>
        ))} */}
      </div>
      <div className="flex flex-col flex-1 h-full bg-[#32353B] relative">
        <div className="flex justify-between  w-full items-center">
          <div className="flex items-center py-[19.5px]">
            <TagOutlinedIcon className="h-6 text-[#8e9297]" />
            <h3 className="ml-2 text-[15px] font-[600]">Technical Solution</h3>
          </div>
          <RefreshIcon
            className="h-5 mr-4"
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
            id="messageList"
          >
            {allMessageRoom?.map((message, index) => {
              // console.log(checkType.includes("image/"));
              if (message.msgType === "text" || message.msgType === "call") {
                // console.log(message);
                // console.log(profile);
                // // return
                return (
                  <MessageText
                    key={message._id}
                    message={message}
                    profile={profile}
                  />
                );
              }

              // if (message?.data) {
              //   const checkType = message.data.content_type;

              //   if (checkType?.includes("image/")) {
              //     return (
              //       <MessageImage message={message} key={index} user={user} />
              //     );
              //   } else {
              //     return (
              //       <MessageFile message={message} key={index} user={user} />
              //     );
              //   }
              // }
              // return <MessageText message={message} key={index} user={user} />;
            })}

            <div ref={messagesEndRef} className="relative top-[40px]" />
          </div>
        </div>

        {/* {inputFile && (
          <div className="flex   w-[calc(100%-30px)] h-[100px] bg-[#40444B] absolute bottom-[3.8rem] left-1 rounded p-4">
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
        )} */}
        <div className="flex items-center absolute bottom-4 left-1 right-6 h-[40px] bg-[#40444B] rounded-lg px-3 text-[#dcddde]">
          <AddCircleOutlineOutlinedIcon
            className="h-6"
            onClick={triggerShowUploadFile}
          />
          <input
            ref={fileUploadRef}
            accept="*"
            type="file"
            onChange={onSelectFile}
            className=" h-full  absolute inset-0 hidden  bg-red-400"
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
          {/* {showEmoji && (
            <div className="absolute top-0 right-0 -translate-y-[105%] z-10">
              <Emoji pickEmoji={pickEmoji} />
            </div>
          )} */}
        </div>
      </div>
      {showEmoji && (
        <div
          onClick={handleShowEmoji}
          id="cover"
          className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0"
        ></div>
      )}
    </div>
  );
}

export default Dashboard;
