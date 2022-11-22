import './App.css';
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import React, { Component }  from 'react';
import{
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import {TopBarAfterLogin} from "./components/TopBar/TopBarAfterLogin";
import {TopBarBeforeLogin} from "./components/TopBar/TopBarBeforeLogin";
import {HomeInventory} from "./components/HomeInventory/HomeInventory";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyCalendar} from "./components/MyCalendar/MyCalendar";


function App() {

  return (
    <div className="App">
        <TopBarAfterLogin/>
        <TopBarBeforeLogin/>

        <BrowserRouter>
            <Routes>
                <Route path={"/mycalendar"} element={<MyCalendar/>}/>
                <Route path="/login-and-register" element={<LoginAndRegister />} />
            </Routes>
        </BrowserRouter>
        
        <HomeInventory/>
    </div>
  )
}

export default App
