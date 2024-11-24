import { useLayoutEffect, useState } from "react";
import Container from "./components/Container";
import FilterTable from "./components/FilterTable";
import TimeSeries from "./components/TimeSeries";
import TSNEPlot from "./components/TSNEPlot";
import Visualisations from "./components/Visualisations";
import BookRecord from "./models/BookRecord";
import { BooksContext } from "./utils/BooksContext";
import { sample_data } from "./utils/sample_data";

function App() {
	// Fetch the data from the API and store here
	const [allData, setAllData] = useState<BookRecord[]>([]);
	const [selectedData, setSelectedData] = useState<BookRecord[]>([]);
	const [plotData, setPlotData] = useState<BookRecord[]>([]);

	useLayoutEffect(() => {
		setAllData([...sample_data]);
		setPlotData([...sample_data]);
	}, []);

	return (
		<main className="flex h-screen flex-col bg-gray-300 p-2">
			<BooksContext.Provider
				value={{
					allData: allData,
					plotData: plotData,
					selectedData: selectedData,
					addSelectedData(item) {
						setSelectedData((prev) => [...prev, item]);
					},
					removeSelectedData(item) {
						setSelectedData((prev) =>
							prev.filter((f) => f.id != item.id)
						);
					},
					setPlotData: setPlotData,
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
					<Container className="col-span-4 h-44">
						<TimeSeries />
					</Container>
					<Visualisations />
				</div>
			</BooksContext.Provider>
		</main>
	);
}

export default App;
