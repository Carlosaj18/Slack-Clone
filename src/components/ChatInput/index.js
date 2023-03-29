import React, { useRef, useState } from "react";

// Styled Components
import { ChatInputContainer } from "./ChatInput.styles";

// Components
import { Button } from "@mui/material";

// Firebase stuff
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ChatInput = ({ channelName, channelId, user }) => {
  const inpRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId) return;

    const innerMessageCol = collection(db, "rooms", channelId, "messages");

    setLoading(true);
    await addDoc(innerMessageCol, {
      message: inpRef.current.value,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    setLoading(false);

    inpRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          disabled={loading}
          ref={inpRef}
          type="text"
          name="message"
          id="message"
          placeholder={`Message #${channelName || "no-selected"}`}
          required
        />
        <Button hidden type="submit">
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;
