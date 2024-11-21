import FilterTable from "./components/FilterTable";
import SContainer from "./components/SContainer";
import Visualisations from "./components/Visualisations";

function App() {
  return (
    <main
      className="min-h-screen items-center justify-center gap-2 dark:bg-gray-800 flex flex-col"
      id="page"
    >
      <div id="row1" className="flex flex-row">
        <div>
          <FilterTable />
        </div>
        <div>
          <SContainer />
        </div>
      </div>
      <div id="row2" className="flex flex-row">
        <Visualisations />
      </div>
    </main>
  );
}

export default App;
