import './App.css';
import {HomeInventory} from "./components/HomeInventory/HomeInventory";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import {MyCalendar} from "./components/MyCalendar/MyCalendar";

function App() {

    return (
        <>
            <BrowserRouter>
                <a href={'/'}>Home</a>
                <br/>
                <a href={'/calendar'}>Calendar</a>
                <Routes>
                    <Route path={'/'} element={
                        <div className="App">
                            <HomeInventory/>
                        </div>
                    }/>
                    <Route path={'/calendar'} element={<MyCalendar/>}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
