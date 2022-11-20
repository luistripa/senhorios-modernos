import "./TopBar.css"
import {AppBar, IconButton, Toolbar, Icon, Stack, Button, Typography} from "@mui/material"
import logo from "../../static/LogoIPM.png"

export function TopBar(props) {

    return(
       <AppBar position="static">
           <Toolbar>
               <IconButton size="large" edge="start" aria-label="logo" color="enherit" href={"https://www.google.com"}>
                   <Icon fontSize="large">
                       <img src={logo} height={40} width={40} alt="OneHome"/>
                   </Icon>
               </IconButton>
               <Typography variant="h6" component="div" textAlign="left" sx={{ flexGrow:1 }}>
                   OneHome
               </Typography>
               <Stack direction="row" spacing={2}>
                   <Button color="inherit" href={"https://www.google.com"}>About OneHome</Button>
                   <Button color="inherit" href={"https://www.google.com"}>Features</Button>
                   <Button color="inherit" href={"https://www.google.com"}>Team</Button>
                   <Button href={"https://www.google.com"} variant="contained">Login</Button>
               </Stack>
           </Toolbar>
       </AppBar>
    );
}