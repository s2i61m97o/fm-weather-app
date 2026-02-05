import "./styles/App.css";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForcast";

function App() {
  return (
    <main>
      <Header />
      <Search />
      {/* <CurrentForecast /> */}
    </main>
  );
}

export default App;
