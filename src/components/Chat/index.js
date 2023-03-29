import React, { useEffect, useState, useRef } from "react";

// Styled components
import {
  ChatContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  ChatMessages,
} from "./Chat.styles";

// Icons
import { StarBorderOutlined, InfoOutlined } from "@mui/icons-material";

// Redux stuff
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";

// Extra Components
import Message from "../Message";
import ChatInput from "../ChatInput";

// Firebase Stuff
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
} from "firebase/firestore";

const Chat = ({ user }) => {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef();
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const [messages, setMessages] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    if (!roomId) return () => {};
    const unsub = onSnapshot(
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snap) => {
        setMessages(snap.docs);
        scrollToBottom();
      },
      (err) => {
        console.error(err);
      }
    );

    return () => {
      unsub();
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return () => {};
    const unsub = onSnapshot(
      doc(db, "rooms", roomId),
      (document) => {
        setRoomDetails(document.data());
      },
      (err) => {
        console.error(err);
      }
    );

    return () => {
      unsub();
    };
  }, [roomId]);

  if (!messages && !roomDetails) {
    return <div></div>;
  }

  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#{roomDetails?.name || "None"}</strong>
          </h4>
          <StarBorderOutlined />
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlined />
            <span>Details</span>
          </p>
        </HeaderRight>
      </Header>

      <ChatMessages ref={chatRef}>
        {messages?.map((doc) => {
          const { message, timestamp, user, userImage } = doc.data();

          return (
            <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })}
      </ChatMessages>

      <ChatInput
        user={user}
        channelName={roomDetails?.name}
        channelId={roomId}
      />
    </ChatContainer>
  );
};

export default Chat;
