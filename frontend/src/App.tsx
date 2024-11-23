import { createContext, useState } from "react";
import FilterTable from "./components/FilterTable";
import SContainer from "./components/SContainer";
import Visualisations from "./components/Visualisations";

function App() {
  // Fetch the data from the API and store here
  const CompleteDataContext = createContext([]);

  const [data, setData] = useState([]);

  // Create Different Traces
  const trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],
    name: "Team A",
    text: ["A-1", "A-2", "A-3", "A-4", "A-5"],
    color: "red",
  };
  const plotData = [trace1];

  return (
    <main
      className="min-h-screen bg-gray-200 flex flex-col px-4 pt-4"
      id="page"
    >
      <CompleteDataContext.Provider value={data}>
        <div id="row1" className="flex flex-row h-1/2">
          <div className="w-1/2 pr-2">
            <FilterTable />
          </div>
          <div className="pl-2">
            <SContainer plotData={plotData} />
          </div>
        </div>
        <div id="row2">{/* <TimeSeries /> */}</div>
        <div id="row3" className="grow-1">
          <Visualisations />
        </div>
      </CompleteDataContext.Provider>
    </main>
  );
}

export default App;
