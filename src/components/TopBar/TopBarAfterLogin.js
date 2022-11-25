import "./TopBar.css"
import * as React from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Icon,
    Stack,
    Button,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    ListItemIcon
} from "@mui/material"
import logo from "../../static/LogoIPM.png"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Logout} from "@mui/icons-material";
import {useEffect, useState} from "react";

export function TopBarAfterLogin() {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

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

    return (
        <>
            <nav className={`${sticky ? "sticky" : ""}`}>
                <div className="nav-inner">
                    <div className="logo">
                        <img src={logo} height={40} width={40}/>
                        <p id={'logoTitle'}>OneHome</p>
                    </div>
                    <div className="links">
                        <Button
                            id="oneHome-button"
                            aria-controls={open ? "oneHome-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="inherit"
                            style={{textTransform: 'none'}}
                            endIcon={<KeyboardArrowDownIcon/>}>
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
                        <Button color="inherit" href={"/my-houses"} style={{textTransform: 'none'}}>My Houses</Button>
                        <Button color="inherit" href={"/my-calendar"} style={{textTransform: 'none'}}>My
                            Calendar</Button>
                        <IconButton
                            id="account-button"
                            aria-controls={open ? "account-button" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick2}
                            color="inherit"
                        >
                            <Avatar/>
                            <Typography sx={{marginLeft: "5px"}}>Nome</Typography>
                        </IconButton>
                        <Menu
                            id="account-menu"
                            anchorEl={accountMenu}
                            open={open2}
                            onClose={handleClose2}
                        >
                            <MenuItem onClick={handleClose2}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>

        </>
    );
}