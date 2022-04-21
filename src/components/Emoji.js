import React from "react";
import EmojiPicker from "emoji-picker-react";

export default function Emoji({ pickEmoji }) {
  return <EmojiPicker onEmojiClick={pickEmoji} />;
}
