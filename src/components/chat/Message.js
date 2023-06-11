import React from 'react'
import styled from "styled-components"

function Message({ message , timestamp, user ,userImage }) {
  return (
    <MessageContainer>
        <img src={userImage} alt="user-Image" />
        <MessageInfo>
            <h4>
                {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
            </h4>
            <p>{message}</p>
        </MessageInfo>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 40px;
        object-fit: contain;
        border-radius: 5px;
    }
`;
const MessageInfo = styled.div`
    padding-left: 10px;

    > h4 > span {
        font-size: 10px;
        margin-left: 5px;
        font-weight: 300;
        color: gray;
    }
    > p {
        margin-top: 5px;
        font-weight: 400;
    }
`;