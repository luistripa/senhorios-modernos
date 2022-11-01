import './App.css';
import {HomeInventory} from "./components/HomeInventory/HomeInventory";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Calendar from "./components/Calendar/Calendar";

import 'bootstrap/dist/css/bootstrap.css';

function App() {

    let events = [
        {
            name: "Teste 1",
            description: "This is a description",
            startDate: new Date(2022, 9, 22, 19, 0, 0),
            endDate: new Date(2022, 9, 22, 20, 0, 0),
            repeat: "NO"
        },
        {
            name: "Teste 2",
            description: "This is a description",
            startDate: new Date(2022, 9, 22, 19, 0, 0),
            endDate: new Date(2022, 9, 25, 20, 0, 0),
            // TODO: what about infinite end date?
            repeat: "DAILY"
        },
    ]

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
                    <Route path={'/calendar'} element={
                        <div style={{width: "50%"}}>
                            <Calendar events={events}/>
                        </div>
                    }/>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
