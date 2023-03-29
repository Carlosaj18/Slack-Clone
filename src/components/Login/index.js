import React from "react";

// Styled Components
import { LoginContainer, LoginInnerContainer } from "./Login.styles";

// Components
import { Button } from "@mui/material";

// Firebase stuff
import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider);
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt="Couldn't Load"
        />
        <h1>Sign In to the Cheap Slack</h1>
        <Button color="success" variant="contained" onClick={signIn}>
          Sign In With Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;
