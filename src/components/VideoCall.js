/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, createRef, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import chatApi from "../services/chatApi";
function VideoCall() {
  const myVideo = createRef();
  const friendVideo = createRef();
  const { profile } = useProfile();
  const { chatId } = useParams();
  // console.log(myVideo);

  // console.log(friendVideo);

  let peer = useRef(null);
  let socket = useRef(null);

  const profileId = profile?._id;

  const addVideoStream = (video, stream) => {

    video.srcObject = stream;
    video.play();
  };

  useEffect(() => {
    if (chatId && profileId) {
      const init = async () => {
        if (!socket.current) {
          socket.current = io(process.env.REACT_APP_SOCKET);
        }
        const data = await chatApi.getFriend(chatId);
        const friendId = data.id;

        if (!peer.current) {
          peer.current = new Peer(profile._id, {
            path: "/peerjs",
            host: process.env.REACT_APP_PEER_HOST,
            port: process.env.REACT_APP_PEER_PORT,
          });
        }
        peer.current.on("open", (id) => {
          socket.current.emit("join-room", chatId, profile._id, "user");
        });

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((stream) => {
        
            if (myVideo?.current) {
              addVideoStream(myVideo.current, stream);
            }

            peer.current.on("call", (call) => {
      
              call.answer(stream);
              call.on("stream", (userVideoStream) => {
             
                if (friendVideo.current) {
                  addVideoStream(friendVideo?.current, userVideoStream);
                }
              });
            });

            const call = peer.current.call(friendId, stream);
            call.on("stream", (userVideoStream) => {
     
              friendVideo.current.srcObject = userVideoStream;
              friendVideo.current.play();
            });
          });
      };
      init();

      return () => {
        socket.current.emit("forceDisconnect");
      };
    }
  }, [chatId, profileId]);

  return (
    <div className="w-screen h-full bg-red-100">
      <video
        className="w-[420px] h-[260px] object-cover absolute bottom-0 right-0 z-50 rounded"
        ref={myVideo}
      ></video>
      <video className="w-screen h-screen object-cover" width="100%" ref={friendVideo}></video>
      {/* <video className="w-[420px] h-[260px] object-cover" ref={friendVideo} ></video> */}
    </div>
  );
}

export default VideoCall;

// const Container = styled.div`
//   width: 100%;
//   height: 100%;

//   .my-video {
//     height: 100vh;
//     width: 100%;
//     object-fit: cover;
//   }
//   .friend-video {
//     width: 420px;
//     height: 260px;
//     position: absolute;
//     background-color: red;
//     bottom: 0;
//     right: 0;
//     z-index: 100;
//     border-radius: 4px;
//   }
// `;
