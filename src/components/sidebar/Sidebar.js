import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import SidebarOption from "./SidebarOption";
import { 
    FiberManualRecordIcon,
    CreateIcon,
    InsertCommentIcon,
    InboxIcon,
    DraftsIcon,
    BookmarkBorderIcon,
    PeopleAltIcon,
    AppsIcon,
    FileCopyIcon,
    ExpandLessIcon,
    ExpandMoreIcon,
    AddIcon
} from './SidebarIcons'
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
    const [user] = useAuthState(auth);
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        db.collection("rooms").onSnapshot((snapShot) => {
            setChannels(snapShot.docs.map(doc => (
                {
                    id: doc.id,
                    name: doc.data().name
                }
            )))
        })
    }, [])

  return (
    <SidebarContainer>
        <SidebarHeader>
            <SidebarInfo>
                <h2>Front-End Dev</h2>
                <h3>
                    <StatusCircleIcon />
                    {user?.displayName}
                </h3>
            </SidebarInfo>
            <CreateIcon />
        </SidebarHeader>
        <SidebarOption Icon={InsertCommentIcon} title="Threads" />
        <SidebarOption Icon={InboxIcon} title="Mention & Reactions" />
        <SidebarOption Icon={DraftsIcon} title="Saved Items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People & User groups" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File Browser" />
        <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
        <hr />
        <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
        {channels?.map(channel => (
            <SidebarOption key={channel.id} title={channel.name} id={channel.id} />
        ))}
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.2;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 50px;
    overflow-y: auto;
    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0.1px solid rgba(255, 255, 255, 0.2);
    }
    
`;
const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 10px;
    padding: 13px;
    justify-content: space-between;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        border-radius: 999px;
        font-size: 18px;
        background-color: white;
        cursor: pointer;
    }
`;
const SidebarInfo = styled.div`
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        font-size: 13px;
        display: flex;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        color: green;
        font-size: 14px;
        margin-right: 1px;
        margin-top: 2px;
    }

`;
const StatusCircleIcon = styled(FiberManualRecordIcon)``;
