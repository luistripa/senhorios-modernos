import "./TopBar.css"
import {AppBar, IconButton, Toolbar, Icon, Stack, Button, Typography} from "@mui/material"
import logo from "../../static/LogoIPM.png"
import * as React from "react";

export function TopBarBeforeLogin(props) {

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
                   <Button color="inherit" href={"https://www.google.com"} style={{textTransform: 'none'}}>About OneHome</Button>
                   <Button color="inherit" href={"https://www.google.com"} style={{textTransform: 'none'}}>Features</Button>
                   <Button color="inherit" href={"https://www.google.com"} style={{textTransform: 'none'}}>Team</Button>
                   <Button href={"/login-and-register"} variant="contained" style={{textTransform: 'none'}}>Login</Button>
               </Stack>
           </Toolbar>
       </AppBar>
    );
}