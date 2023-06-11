import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Avatar } from "@mui/material"
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
function Header() {
    const [user] = useAuthState(auth);
  return (
    <>
        <div className="header">
            <HeaderContainer>
                <HeaderLeft>
                    <HLTimeIcon />
                </HeaderLeft>

                <HeaderSearch>
                    <div>
                        <HSTuneRoundedIcon />
                        <HSSearchIcon />
                    </div>
                    <SearchInput placeholder="Search" maxLength={30} />
                </HeaderSearch>
                <HeaderRight>
                    <HRHelpIcon />
                    <HeaderAvatar onClick={() => auth?.signOut()} src={user?.photoURL} alt={user?.displayName} sx={{ width: 30, height: 30 }} variant="square"/>
                </HeaderRight>
            </HeaderContainer>
        </div>
        <Outlet />
    </>
  )
}

export default Header
const HeaderContainer = styled.div`
    display: flex;
    background-color: var(--slack-color);
    justify-content: space-between;
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);
    padding: 10px 0;
    position: fixed;
    width: 100%;
`;
const HeaderLeft = styled.div`
    display: flex;
    flex: 1.5;
    justify-content: flex-end;

    .MuiSvgIcon-root {
        margin-right: 20px;
        margin-left: auto;
    }
`;

const HeaderSearch = styled.div`
    display: flex;
    flex: 5;
    padding: 0 10px;
    align-items: center;
    background: rgb(255, 255, 255, 0.2);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: 26px;
    min-width: 0;
    cursor: pointer;

    :hover {
        background: rgb(255, 255, 255, 0.29);
    }
`;

const SearchInput = styled.input`
    color: white;
    border: none;
    outline: none;
    background: none;

    ::placeholder{
        color: white;
    }
`;

const HeaderRight = styled.div`
    display: flex;
    flex: 1.5;
    padding: 0 16px 0 32px;
    position: relative;
    justify-content: flex-end;
    align-items: center;

    > .MuiSvgIcon-root {
        margin-right: 26px;
        margin-left: auto;
    }

`;
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    border-radius: 5px !important;
    :hover {
        opacity: 0.8;
    }
`;

const HLTimeIcon = styled(AccessTimeIcon)`
    color: #eeebee !important;
    cursor: pointer;
`;
const HRHelpIcon = styled(HelpOutlineOutlinedIcon)`
    color: #eeebee !important;
    font-size: 20px;
    cursor: pointer;


`;
const HSTuneRoundedIcon = styled(TuneRoundedIcon)`
    font-size: 21px !important;
    color: #eeebee !important;
`;

const HSSearchIcon = styled(SearchIcon)`
    font-size: 20px !important;
    color: #d3ccd3 !important;

`;
