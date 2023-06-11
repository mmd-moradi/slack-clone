import React, { useEffect, useRef } from 'react'
import styled from "styled-components"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ExpandMoreIcon } from "../sidebar/SidebarIcons";
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import ChatInput from "./ChatInput";
import { useDocumentOnce, useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase";
import Message from "./Message";

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocumentOnce(roomId && db.collection("rooms").doc(roomId));
    const [roomMessages, loading] = useCollection(roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc"));

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    },[roomId, loading]);

  return (
    <ChatContainer>
        {roomId && roomDetails && (
            <>
                <Header>
                    <HeaderLeft>
                        <h3><strong># {roomDetails?.data().name}</strong></h3>
                        <ExpandMoreIcon />
                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                        <InfoOutlinedIcon />
                        Detail 
                        </p>
                    </HeaderRight>
                </Header>
            
                <ChatMessages>
                    {roomMessages?.docs.map(doc => {
                        const {user, message, userImage, timestamp} = doc.data();
                        return (
                            <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                        )
                    })}
                    <ChatBottom ref={chatRef} />
                </ChatMessages>

                <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId}/>
            </>
        )}
        
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
    flex: 1;
    margin-top: 50px;
    overflow-y: scroll;
`;
const Header = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div`

`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        text-transform: lowercase;
    }
    > .MuiSvgIcon-root {
        margin-left: 5px;
        font-size: 18px;
    }
`;
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    
    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;