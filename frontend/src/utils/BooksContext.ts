import { createContext } from "react";
import BookRecord from "../models/BookRecord";

export type BooksContextType = {
	allData: BookRecord[];
	selectedData: BookRecord[];
	filteredData: BookRecord[];
	plotData: BookRecord[];
	time: {
		min: number;
		max: number;
		filter_min: number;
		filter_max: number;
	};

	addSelectedData: (item: BookRecord) => void;
	removeSelectedData: (item: BookRecord) => void;
	setPlotData: React.Dispatch<React.SetStateAction<BookRecord[]>>;
	setFilteredData: React.Dispatch<React.SetStateAction<BookRecord[]>>;
	setFilterTimeMin: (val: number) => void;
	setFilterTimeMax: (val: number) => void;
};

export const BooksContext = createContext<BooksContextType>({
	allData: [],
	plotData: [],
	selectedData: [],
	filteredData: [],
	time: {
		min: 0,
		max: 0,
		filter_min: 0,
		filter_max: 0,
	},
	addSelectedData: () => {},
	removeSelectedData: () => {},
	setPlotData: () => {},
	setFilteredData: () => {},
	setFilterTimeMin: () => {},
	setFilterTimeMax: () => {},
});
