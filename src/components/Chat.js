import React, { useEffect } from "react";
import useToggle from "../hooks/useToggle";
import { messageListen } from "../utils/firebase";
import Dashboard from "./Dashboard";

function Chat() {
  const [showOtherUser, setShowOtherUser] = useToggle(false);
  useEffect(() => {
    // onMessageListener();
    messageListen();
  });
  return (
    <div className="test flex items-center h-full w-full">
      <Dashboard user="User 1" setShowOtherUser={setShowOtherUser} />
      {showOtherUser && (
        <Dashboard user="User 2" setShowOtherUser={setShowOtherUser} />
      )}
    </div>
  );
}

export default Chat;
