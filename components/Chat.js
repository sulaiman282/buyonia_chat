import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Router from "next/router";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    Router.push(`/chat/${id}`);
  };
 

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar>
          <Avatar src={recipient?.photoURL} size={100} style={{ border: 0 }} />
        </UserAvatar>
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p> {recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
