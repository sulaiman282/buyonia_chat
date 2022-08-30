import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import * as EmailValidator from "email-validator";
import Link from "@mui/material/Link";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../components/Chat";

function Sidebar() {
  var count = 1;

  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  
  const createChat = () => {
    const input = prompt("Please enter an email address to connect");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    chatsSnapshot?.docs.find(
      (chat) =>
        !!chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  const displayLogoutbtn = () => {
    count = count + 1;
    if (count % 2 == 0)
      document.getElementById("logout-btn").style.display = "block";
    else document.getElementById("logout-btn").style.display = "none";
  };

  const Logout = () => {
    auth.signOut();
  };


  return (
    <Container>
      <Header>
        <UserAvatarContainer>
          <UserAvatar>
            <Avatar
              onClick={displayLogoutbtn}
              src={user.photoURL}
              size={100}
             
              style={{ border: 0 }}
            />
          </UserAvatar>

          <Link
            onClick={Logout}
            id="logout-btn"
            underline="none"
            display="none"
          >
            {"Logout"}
          </Link>
        </UserAvatarContainer>

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;
::-webkit-scrollbar{
  display: none;
}
-ms-overflow-style: none;
scrollbar-width:none;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  background-color: white;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  align-items: center;
`;

const UserAvatarContainer = styled.div`
  cursor: pointer;
  link {
    display: none;
  }
`;

const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: white;
  color: black;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  color: black;
  font-weight: bold;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const UserAvatar = styled.div`
  :hover {
    opacity: 0.5;
  }
`;
