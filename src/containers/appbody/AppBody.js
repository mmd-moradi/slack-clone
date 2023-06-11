import React from 'react'
import styled from "styled-components";
import { Sidebar, Chat } from "../../components";
function AppBody() {
  return (
    <AppBodyDiv >
        <Sidebar />
        <Chat />
    </AppBodyDiv>
    
  )
}

export default AppBody;

const AppBodyDiv = styled.div`
    display: flex;
    height: 100vh;
`;
