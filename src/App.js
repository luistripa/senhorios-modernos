import './App.css';
import {HomeInventory} from "./components/HomeInventory/HomeInventory";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Calendar from "./components/Calendar/Calendar";

import 'bootstrap/dist/css/bootstrap.css';

import moment from "moment";

function App() {

    let events = [
        {
            id: 1,
            type: "MAINTENANCE",
            name: "Carpinteiro",
            description: "This is a description",
            startDate: moment("2022-11-23 19:00:00"),
            endDate: moment("2022-11-23 20:00:00"),
            repeat: "NO"
        },
        {
            id: 2,
            type: "OCCUPATION",
            name: "Casal de turistas",
            description: "This is a description",
            startDate: moment("2022-11-22 19:00:00"),
            endDate: moment("2022-11-25 20:00:00"),
            // TODO: what about infinite end date?
            repeat: "DAILY"
        },
        {
            id: 3,
            type: "MAINTENANCE",
            name: "Canalisador",
            description: "This is a description",
            startDate: moment("2022-11-22 17:00:00"),
            endDate: moment("2023-02-25 18:00:00"),
            // TODO: what about infinite end date?
            repeat: "MONTHLY"
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
