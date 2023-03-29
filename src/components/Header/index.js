import React from "react";

// Styled Components
import {
  HeaderAvatar,
  HeaderContainer,
  HeaderLeft,
  HeaderSearch,
  HeaderRight,
} from "./Header.styles";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// Firebase Stuff
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

const Header = ({ user }) => {
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => {
            signOut(auth);
          }}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
