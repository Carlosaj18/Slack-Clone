import React, { useEffect, useState } from "react";

// Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Styled Components
import { AppBody } from "./App.styles";
import styled from "styled-components";
import Spinner from "react-spinkit";

// Firebase Stuff
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [authentication, loading] = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (userx) => {
        setUser(userx);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const timerId = setTimeout(() => {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }, 5000);

  if (loading) {
    clearTimeout(timerId);
  }

  return (
    <div>
      <Router>
        <ErrorBoundary>
          {!user ? (
            <Login />
          ) : (
            <>
              <Header user={user} />
              <AppBody>
                <Sidebar user={user} />
                <Routes>
                  <Route path="/" element={<Chat user={user} />} />
                </Routes>
              </AppBody>
            </>
          )}
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
