import './App.css';
import {HomeInventory} from "./components/HomeInventory/HomeInventory";
import {TopBar} from "./components/TopBar/TopBar";

function App() {
  return (
    <div className="App">
        <TopBar/>
        <HomeInventory/>
    </div>
  );
}

export default App;
