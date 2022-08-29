import React from "react";
import styled from "styled-components";
import {Circle} from "better-react-spinkit";


function Loading() {
  return (
    <LoadingContainer>
      <center>
        <Logo
          src="https://i.ibb.co/WWsVfGW/bg1.png"
          alt="buyonia"
          border="0"
        />

        <Circle color="Blue" size={60} />
      </center>
    </LoadingContainer>
  );
}

export default Loading;

const Logo = styled.img`
  margin-bottom: 50px !important;
`;

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
