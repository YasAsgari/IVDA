import { useLayoutEffect, useState } from "react";
import Container from "./components/Container";
import FilterTable from "./components/FilterTable";
import TimeSeries from "./components/TimeSeries";
import TSNEPlot from "./components/TSNEPlot";
import Visualisations from "./components/Visualisations";
import BookRecord from "./models/BookRecord";
import { BooksContext } from "./utils/BooksContext";
import { sample_data } from "./utils/sample_data_1";

function App() {
  // Fetch the data from the API and store here
  const [allData, setAllData] = useState<BookRecord[]>([]);
  const [selectedData, setSelectedData] = useState<BookRecord[]>([]);
  const [filteredData, setFilteredData] = useState<BookRecord[]>([]);
  const [plotData, setPlotData] = useState<BookRecord[]>([]);
  const [time, setTime] = useState({
    min: 0,
    max: 0,
    filter_min: 0,
    filter_max: 0,
  });

  useLayoutEffect(() => {
    setAllData([...sample_data]);
    setFilteredData([...sample_data]);
    setPlotData([...sample_data]);

    const min_year =
      Math.floor(Math.min(...sample_data.map((s) => s.publication.year)) / 5) *
      5;
    const max_year =
      Math.ceil(
        Math.max(...sample_data.map((s) => s.publication.year)) / 5 + 1
      ) * 5;

    setTime({
      min: min_year,
      max: max_year,
      filter_min: min_year,
      filter_max: max_year,
    });
  }, []);

  return (
    <main className="flex h-screen flex-col bg-gray-300 p-2">
      <BooksContext.Provider
        value={{
          allData: allData,
          plotData: plotData,
          selectedData: selectedData,
          filteredData: filteredData,
          time: time,
          addSelectedData(item) {
            setSelectedData((prev) => [...prev, item]);
          },
          removeSelectedData(item) {
            setSelectedData((prev) => prev.filter((f) => f.id != item.id));
          },
          setSelectedData(data) {
            setSelectedData(data);
          },
          setFilteredData: setFilteredData,
          setPlotData: setPlotData,
          setFilterTimeMin: (val: number) =>
            setTime((prev) => ({ ...prev, filter_min: val })),
          setFilterTimeMax: (val: number) =>
            setTime((prev) => ({ ...prev, filter_max: val })),
        }}
      >
        <div className="grid h-1/2 w-full grid-cols-[67rem_auto] grid-rows-1 gap-1">
          <Container>
            <FilterTable />
          </Container>
          <Container>
            <TSNEPlot />
          </Container>
        </div>
        <div className="mt-1 grid grid-cols-4 grid-rows-[180px_calc(50vh-196px)] gap-1">
          <Container className="col-span-4 h-44 !pb-0 !pt-2">
            <TimeSeries />
          </Container>
          <Visualisations />
        </div>
      </BooksContext.Provider>
    </main>
  );
}

export default App;
