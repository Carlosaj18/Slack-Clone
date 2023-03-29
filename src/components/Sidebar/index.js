import React, { useEffect, useState } from "react";

// Styled Components
import { SidebarContainer, SidebarHeader, SidebarInfo } from "./Sidebar.styles";

// Icons
import {
  FiberManualRecord,
  Create,
  InsertComment,
  Inbox,
  Drafts,
  BookmarkBorder,
  PeopleAlt,
  Apps,
  FileCopy,
  ExpandLess,
  ExpandMore,
  Add,
} from "@mui/icons-material";

// Components
import SidebarOption from "../SidebarOption";

// Firebase stuff
import { db } from "../../firebase";
import { onSnapshot, query, collection } from "firebase/firestore";

const Sidebar = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  const roomsCol = collection(db, "rooms");

  useEffect(() => {
    const unsub = onSnapshot(
      query(roomsCol),
      (snap) => {
        setRooms(snap.docs);
      },
      (err) => {
        console.error(err);
      }
    );
    return () => {
      unsub();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Carlos's Slack</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions and Reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SidebarOption Icon={PeopleAlt} title="People and user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File Browser" />
      <SidebarOption Icon={ExpandLess} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} title="Add Channel" addChannelOption />
      {rooms?.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
