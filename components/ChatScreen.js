import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import firebase from 'firebase/compat/app';
import Message from "./Message"
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";



function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input,setInput] = useState("");
  const router = useRouter();
const endOfMessagesRef = useRef(null);

const ScrollToBottom=()=>{
  endOfMessagesRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const [messagesSnapshot] = useCollection(
    
      db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
    
  );

  
const[recipientSnapshot]=useCollection(
  db.collection("users").where('email','==',getRecipientEmail(chat.users,user)
)
)


  const showMessages=(e)=>{
    if(messagesSnapshot){
      return messagesSnapshot.docs.map(message=>(
        <Message key={message.id}
        user={message.data().user}
        message={{
          ...message.data(),
          timestamp:message.data().timestamp?.toDate().getTime(),
        }}
        />
      ));
    } else {
      return JSON.parse(messages).map(message=>(
    <Message key={message.id} user={message.user} message={message}/>

      ))
    }
   
  }


  const sendMessage=(e)=>{
  
    e.preventDefault();
    db.collection("users").doc(user.uid).set({
lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
    },{merge:true});
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      message:input,
      user:user.email,
      photoURL:user.photoURL,
    })
  
setInput("");

ScrollToBottom();
  };









const recipient=recipientSnapshot?.docs?.[0]?.data();
const recipientEmail=getRecipientEmail(chat.users,user);

  return (
    <Container>
      <Header>
       

        {recipient?(
          <Avatar src={recipient?.photoURL}/>
        ):(
          <Avatar>{recipientEmail[0]}</Avatar>
        )}



        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          
{recipientSnapshot?(
  <p>Last active:{" "}
  {recipient?.lastSeen?.toDate()?(
    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
  ):(
    "Unavailable") }
  </p>
):(
  <p>Loading Last active...</p>
)

}





        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
      {showMessages()}
        <EndOfMessage  ref={endOfMessagesRef}/>
      </MessageContainer>



<InputContainer >
<InsertEmoticonIcon/>
<Input value={input}  onChange={e=>setInput(e.target.value)}/>
<button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
<MicIcon/>
</InputContainer>      
    </Container>  
  );
}
export default ChatScreen;

const Container = styled.div`

`;

const Input = styled.input`
flex: 1;
align-items: center;
padding: 20px;
position: sticky;
bottom: 0;
background-color:whitesmoke;
color:black;

`;


const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const IconButton = styled.div``;

const MessageContainer = styled.div`
padding:30px;
margin-bottom :5vh;
background-color:#8d8dc4;
min-height:80vh;
flex-direction: column-reverse;

`;



const EndOfMessage = styled.div``;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position:sticky;
bottom: 0;
background-color: white;
z-index: 100;
`;