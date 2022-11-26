import './App.css';
import {Homepage} from "./components/Homepage/Homepage";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import {MyCalendar} from "./components/MyCalendar/MyCalendar";
import MyHousesPage from "./components/MyHousesPage/MyHousesPage";
import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";


const App = () => {

  return (
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path="/login-and-register" element={<LoginAndRegister/>} />
            <Route path={"/my-houses"} element={<MyHousesPage/>}/>
            <Route path={"/my-calendar"} element={<MyCalendar/>}/>
        </Routes>
      </BrowserRouter>
  )
}


export default App
