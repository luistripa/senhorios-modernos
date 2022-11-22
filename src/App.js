import './App.css';
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";

import React, { Component }  from 'react';
import{
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login-and-register" element={<LoginAndRegister />} />
            </Routes>
        </Router>
    </div>
  )
}

const Homepage = () => {
    return (
        <>
            <div>
                <Link to="/login-and-register">Login</Link>
            </div>
        </>
    )
}

export default App
