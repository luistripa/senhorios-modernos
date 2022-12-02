import './App.css';
import {Homepage} from "./components/Homepage/Homepage";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import {MyCalendar} from "./components/MyCalendar/MyCalendar";
import MyHousesPage from "./components/MyHousesPage/MyHousesPage";
import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HousePage} from "./components/HousePage/HousePage";
import {TopBar} from "./components/TopBar/TopBar";


const App = () => {
    return (
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path="/login-and-register" element={<LoginAndRegister/>} />
                <Route path={"/my-houses"} element={<MyHousesPage/>}/>
                <Route path={"/my-calendar"} element={<MyCalendar/>}/>
                <Route path={"/house-page/:houseId"} element={<HousePage/>}/>
            </Routes>
        </BrowserRouter>
  )
}


export default App
