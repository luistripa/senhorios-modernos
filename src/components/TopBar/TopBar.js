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
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import {useNavigate} from "react-router-dom";
import API from "../../api";


export function TopBar() {
    const [sticky, setSticky] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const [loggedInUser, setLoggedInUser] = useState(undefined);
    const [accountInfoOpen, setAccountInfoOpen] = useState(false);

    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => setLoginModalOpen(false);

    const userAvatar = '/avatar.jpeg';

    const [dropDown, setDropDown] = React.useState(null);
    const [accountMenu, setAccountMenu] = React.useState(null);
    const open = Boolean(dropDown);

    const navigate = useNavigate()

    const handleOneHomeDropDownOpen = (event) => {
        setDropDown(event.currentTarget);
    };
    const handleOneHomeDropDownClose = () => {
        setDropDown(null);
    };
    const handleAccountInfoOpen = (event) => {
        setAccountInfoOpen(true);
        setAccountMenu(event.currentTarget);
    };
    const handleAccountInfoClose = () => {
        setAccountInfoOpen(false);
        setAccountMenu(undefined)
    };

    const handleLogout = () =>{
        sessionStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    /*
    Get logged in user from the database if the token exists
     */
    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token)
            API.get('/users/current', {headers: {authorization: token}})
                .then(response => {
                    if (response.status === 200) {
                        setLoggedInUser(response.data)
                    }
                })
                .catch(reason => console.error(reason))
    }, [])

    /*
    Creates scroll event handler to change the topBar to stick to the top of the page
     */
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function dropDownUserInfo() {
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
                            <p>{loggedInUser.name}</p>
                        </div>
                        <p id='userEmail'> {loggedInUser.email} </p>
                    </div>
                    <Button className={'log-out'} onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </Button>
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
            <nav className={sticky ? "topBar sticky" : "topBar"}>
                <div className="nav-inner">
                    <a href="/">
                        <div className="logo">
                            <img alt="logo" src={sticky ? logo1 : logo2} height={40} width={40}/>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                                <p className={'title'}>OneHome</p>
                            </div>
                        </div>
                    </a>

                    <div className="links">
                        <Button
                            id="oneHome-button"
                            className={"link-item"}
                            aria-controls={open ? "oneHome-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleOneHomeDropDownOpen}
                            endIcon={<KeyboardArrowDownIcon/>}
                            color={'inherit'}
                            style={{textTransform: 'none'}}>
                            OneHome
                        </Button>
                        <Menu
                            id="drop-down-menu"
                            className={"link-item"}
                            anchorEl={dropDown}
                            open={open}
                            onClose={handleOneHomeDropDownClose}
                        >
                            <a href={"/#about-section"} style={{textDecoration: "none", color: "inherit"}}>
                                <MenuItem onClick={handleOneHomeDropDownClose}>About OneHome</MenuItem>
                            </a>
                            <a href={"/#features-section"} style={{textDecoration: "none", color: "inherit"}}>
                                <MenuItem onClick={handleOneHomeDropDownClose}>Features</MenuItem>
                            </a>
                            <a href={"/#team-section"} style={{textDecoration: "none", color: "inherit"}}>
                                <MenuItem onClick={handleOneHomeDropDownClose}>Team</MenuItem>
                            </a>
                        </Menu>
                        <a className={"link-item"} href="/my-houses">My Houses</a>
                        <a className={"link-item"} href="/my-calendar">My Calendar</a>
                        <IconButton
                            id="account-button"
                            className={"link-item"}
                            aria-controls={open ? "account-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleAccountInfoOpen}
                            color="inherit"
                        >
                            <Avatar src={userAvatar}/>&nbsp;&nbsp;
                            <p sx={{marginLeft: "5px"}}>{loggedInUser ? loggedInUser.username : ""}</p>
                        </IconButton>
                        <Menu
                            id="account-menu"
                            className={"link-item"}
                            anchorEl={accountMenu}
                            open={accountInfoOpen}
                            onClose={handleAccountInfoClose}
                        >
                            <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
                                {accountInfoOpen ? dropDownUserInfo() : undefined}
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
                <nav className={sticky ? "topBar sticky" : "topBar"}>
                    <div className="nav-inner">
                        <a href="/" className="logo">
                            <img src={sticky ? logo1 : logo2} height={40} width={40}/>
                            <div>
                                <p className={'title'}>OneHome</p>
                            </div>
                        </a>
                        <div className="links">
                            <a className={"link-item"} href="/#about-section">About OneHome</a>
                            <a className={"link-item"} href="/#feature-section">Features</a>
                            <a className={"link-item"} href="/#team-section">Team</a>
                            <Button variant={"contained"} color={"primary"} sx={{margin: "15px"}} onClick={handleLoginModalOpen}>Login</Button>
                        </div>
                    </div>
                    <LoginAndRegister toggleLogin={loginModalOpen} open={loginModalOpen} onClose={handleLoginModalClose}/>
                </nav>
            </>
        );
    }
}