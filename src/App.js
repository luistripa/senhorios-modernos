import './App.css';
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import React, { Component }  from 'react';
import {TopBarAfterLogin} from "./components/TopBar/TopBarAfterLogin";
import {TopBarBeforeLogin} from "./components/TopBar/TopBarBeforeLogin";
import {HomeInventory} from "./components/HomeInventory/HomeInventory";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyCalendar} from "./components/MyCalendar/MyCalendar";
import MyHousesPage from "./components/MyHousesPage/MyHousesPage";


function App() {

  return (
    <div className="App">
            <TopBarBeforeLogin/>

        <BrowserRouter>
            <Routes>
                <Route path={"/my-calendar"} element={<MyCalendar/>}/>
                <Route path="/login-and-register" element={<LoginAndRegister />} />
                <Route path={"/my-houses"} element={<MyHousesPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
