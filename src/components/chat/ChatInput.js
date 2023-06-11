import { Button } from "@mui/material";
import React, { useState } from 'react'
import styled from "styled-components"
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
function ChatInput({ chatRef, channelName, channelId }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("")
    const sendMessage = (e) => {
        e.preventDefault();
        if(channelId){
            db.collection("rooms").doc(channelId).collection("messages").add({
                message: input,
                user: user?.displayName,
                userImage: user?.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setInput("");
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }
  return (
    <ChatInputContainer>
        <form>
            <input value={input} type="text" placeholder={`Message #${channelName}`} onChange={e => setInput(e.target.value)} />
            <Button hidden type="submit" onClick={sendMessage}>Send</Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput


const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        border: 1px solid gray;
        padding: 20px;
        border-radius: 3px;
        outline: none;
        width: 70%;
    }
    > form > button {
        display: none !important;
    }

`;