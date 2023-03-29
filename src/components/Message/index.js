import React from "react";

// Styled components
import { MessageContainer, MessageInfo } from "./Message.styles";

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt="None" />
      <MessageInfo>
        <h4>
          {user}{" "}
          <span>
            {timestamp ? new Date(timestamp.toDate()).toUTCString() : ""}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
