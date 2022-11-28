import "./TopBar.css"
import * as React from 'react';
import {
    IconButton,
    Button,
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon
} from "@mui/material"
import logo2 from "../../static/LogoIPM-roxo.png"
import logo1 from "../../static/LogoIPM-branco.png"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Logout} from "@mui/icons-material";
import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

export function TopBar() {
    const [sticky, setSticky] = useState(false);

    //replace with database
    const userName = 'Nome';
    const userApelido = 'Apelido';
    const userEmail = 'Email@user.com';
    const userAvatar = '/avatar.jpeg';

    const [dropDown, setDropDown] = React.useState(null);
    const [accountMenu, setAccountMenu] = React.useState(null);
    const open = Boolean(dropDown);
    const open2 = Boolean(accountMenu);

    const handleClick = (event) => {
        setDropDown(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAccountMenu(event.currentTarget);
    };
    const handleClose = () => {
        setDropDown(null);
    };
    const handleClose2 = () => {
        setAccountMenu(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function dropDownMenuLogin() {
        return (
            <>
                <div className={'profile-user'}
                     style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div className={'avatar'}>
                        <Avatar src={userAvatar}/>
                    </div>
                    <div className={'data-user'}
                         style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div className={'names-user'} style={{display: "flex", flexDirection: "row"}}>
                            <p>{userName}</p>
                            &nbsp;
                            <p>{userApelido}</p>
                        </div>
                        <p id='userEmail'> {userEmail} </p>
                    </div>
                    <div className={'log-out'}>
                        <ListItemIcon onClick={() => sessionStorage.removeItem('token') && window.location.reload() && <Navigate to={'/Homepage'}/>}>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </div>
                </div>
            </>
        );
    }

    let login = false;
    if(sessionStorage.getItem('token')){
        login = true;
    }

    if(login){
        return (<>
            <nav className={`${sticky ? "sticky" : ""}`}>
                <div className="nav-inner">
                    <div className="logo">
                        <img alt="logo" src={sticky ? logo1 : logo2} height={40} width={40}/>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                            <p id={'logoTitle'}>OneHome</p>
                        </div>
                    </div>
                    <div className="links">
                        <Button
                            id="oneHome-button"
                            aria-controls={open ? "oneHome-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon/>}
                            color={'inherit'}
                            style={{textTransform: 'none'}}>
                            OneHome
                        </Button>
                        <Menu
                            id="drop-down-menu"
                            anchorEl={dropDown}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>About OneHome</MenuItem>
                            <MenuItem onClick={handleClose}>Features</MenuItem>
                            <MenuItem onClick={handleClose}>Team</MenuItem>
                        </Menu>
                        <a href="/my-houses">My Houses</a>
                        <a href="/my-calendar">My Calendar</a>
                        <IconButton
                            id="account-button"
                            aria-controls={open ? "account-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick2}
                            color="inherit"
                        >
                            <Avatar src={userAvatar}/>&nbsp;&nbsp;
                            <p sx={{marginLeft: "5px"}}>{userName}</p>
                        </IconButton>
                        <Menu
                            id="account-menu"
                            anchorEl={accountMenu}
                            open={open2}
                            onClose={handleClose2}
                        >
                            <MenuItem onClick={handleClose2}>
                                {dropDownMenuLogin()}
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
        </>);
    }
    else{
        return (
            <>
                <nav className={`${sticky ? "sticky" : ""}`}>
                    <div className="nav-inner">
                        <div className="logo">
                            <img src={sticky ? logo1 : logo2} height={40} width={40}/>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                                <p id={'logoTitle'}>OneHome</p>
                            </div>
                        </div>
                        <div className="links">
                            <a href="#">About OneHome</a>
                            <a href="#">Features</a>
                            <a href="#">Team</a>
                            <a href="/login-and-register">Login</a>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}