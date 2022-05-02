import React, { useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { messageListen } from "../utils/firebase";
import Dashboard from "./Dashboard";

function Chat() {
  useEffect(() => {
    // onMessageListener();
    messageListen();
  });

 
  return <Dashboard user="User 1"/>;
}

export default Chat;
