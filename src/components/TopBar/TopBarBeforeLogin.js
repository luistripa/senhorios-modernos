import "./TopBar.css"
import {AppBar, IconButton, Toolbar, Icon, Stack, Button, Typography} from "@mui/material"
import logo from "../../static/LogoIPM-no-background.png"
import * as React from "react";
import {useEffect, useState} from "react";

export function TopBarBeforeLogin() {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <>
            <nav className={`${sticky ? "sticky" : ""}`}>
                <div className="nav-inner">
                    <div className="logo">
                        <img src={logo} height={40} width={40}/>
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