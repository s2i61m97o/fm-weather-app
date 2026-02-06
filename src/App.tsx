import "./styles/App.css";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForcast";
import {useState} from "react";
import type {Location} from "./types";

function App() {
  const [currentLocation, setCurrentLocation] = useState<Location>();
  console.log(currentLocation);
  return (
    <main>
      <Header />
      <Search setLocation={setCurrentLocation} />
      <CurrentForecast />
    </main>
  );
}

export default App;
