import {TopBarAfterLogin} from "./components/TopBar/TopBarAfterLogin";
import {TopBarBeforeLogin} from "./components/TopBar/TopBarBeforeLogin";
import {HomeInventory} from "./components/HomeInventory/HomeInventory";

function App() {
  return (
    <div className="App">
        <TopBarAfterLogin/>
        <TopBarBeforeLogin/>
        <HomeInventory/>
    </div>
  );
}

export default App;
