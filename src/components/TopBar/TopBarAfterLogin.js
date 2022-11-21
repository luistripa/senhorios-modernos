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

export function TopBarAfterLogin(props) {

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

    return(
       <AppBar position="static">
           <Toolbar>
               <IconButton size="large" edge="start" aria-label="logo" color="enherit" href={"https://www.google.com"}>
                   <Icon fontSize="large">
                       <img src={logo} height={40} width={40} alt="OneHome"/>
                   </Icon>
                   <Typography variant="h6" component="div" textAlign="left" color="white" sx={{marginLeft:"5px", flexGrow:1}}>
                       OneHome
                   </Typography>
               </IconButton>
               <Stack direction="row" spacing={2} sx={{marginLeft: "auto"}}>
                   <Button
                       id="oneHome-button"
                       aria-controls={open ? "oneHome-button" : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleClick}
                       color="inherit"
                       style={{textTransform: 'none'}}
                       endIcon={<KeyboardArrowDownIcon />}
                   >
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
                   <Button color="inherit" href={"https://www.google.com"} style={{textTransform: 'none'}}>My Houses</Button>
                   <Button color="inherit" href={"https://www.google.com"} style={{textTransform: 'none'}}>My Calendar</Button>
                   <IconButton
                       id="account-button"
                       aria-controls={open ? "account-button" : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleClick2}
                       color="inherit"
                   >
                       <Avatar/>
                       <Typography sx={{marginLeft:"5px"}}>Nome</Typography>
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
               </Stack>

           </Toolbar>
       </AppBar>
    );
}