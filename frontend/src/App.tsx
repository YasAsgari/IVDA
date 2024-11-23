import FilterTable from "./components/FilterTable";
import SContainer from "./components/SContainer";
import Visualisations from "./components/Visualisations";

function App() {
  return (
    <main
      className="min-h-screen bg-gray-200 flex flex-col px-4 pt-4"
      id="page"
    >
      <div id="row1" className="flex flex-row h-1/2">
        <div className="w-1/2">
          <FilterTable />
        </div>
        <div className="">
          <SContainer />
        </div>
      </div>
      <div id="row2">{/* <TimeSeries /> */}</div>
      <div id="row3" className="grow-1">
        <Visualisations />
      </div>
    </main>
  );
}

export default App;
