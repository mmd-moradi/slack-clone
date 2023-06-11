import React from 'react';
import './App.css';
import { AppBody, Header, Login } from './containers';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  useNavigate,
  Router,
} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";
import styled from "styled-components";
import Spinner from "react-spinkit";


function App() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.iconscout.com/icon/free/png-512/free-slack-logo-1481728-1254330.png?f=avif&w=256" alt="slack-logo" />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none"/>
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Header />} >
              <Route index element={<AppBody />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;

const AppLoading = styled.div`
    display: grid;
    height: 100vh;
    place-items: center;
    width: 100%;
`;
const AppLoadingContents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 100px;
    text-align: center;

    > img {
        height: 100px;
        padding: 20px;
        margin-bottom: 40px;
    }

`;
