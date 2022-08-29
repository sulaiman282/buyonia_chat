import Head from "next/head";
import React from "react";
import styled from "styled-components";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";

function login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Buyonia-Login</title>
      </Head>

      <LoginContainer>
        <Logo
          src="https://i.ibb.co/nm9ckd7/buyonia.png"
          alt="buyonia"
          border="0"
        />
        <GoogleButton onClick={signIn} />
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-image: linear-gradient(
    109.6deg,
    rgba(156, 252, 248, 1) 11.2%,
    rgba(110, 123, 251, 1) 91.1%
  );
  background-size: 100%;
  background-repeat: no-repeat;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 50px;
`;
const Logo = styled.img`
  margin-bottom: 30px;
`;
