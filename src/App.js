import './App.css';
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import React, { Component }  from 'react';
import {TopBarAfterLogin} from "./components/TopBar/TopBarAfterLogin";
import {TopBarBeforeLogin} from "./components/TopBar/TopBarBeforeLogin";
import {HomeInventory} from "./components/HomeInventory/HomeInventory";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyCalendar} from "./components/MyCalendar/MyCalendar";


function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login-and-register" element={<LoginAndRegister />} />
                <Route path={"/mycalendar"} element={<MyCalendar/>}/>
            </Routes>
        </BrowserRouter>
  )
}

const Homepage = () => {
    return(
        <>
            <TopBarBeforeLogin/>
        </>
    )
}

export default App
