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
            </Routes>
        </BrowserRouter>
        <HomeInventory/>
    </div>
  );
}

export default App;
