import { createContext } from "react";
import BookRecord from "../models/BookRecord";

export type BooksContextType = {
	allData: BookRecord[];
	selectedData: BookRecord[];
	plotData: BookRecord[];

	addSelectedData: (item: BookRecord) => void;
	removeSelectedData: (item: BookRecord) => void;
	setPlotData: React.Dispatch<React.SetStateAction<BookRecord[]>>;
};

export const BooksContext = createContext<BooksContextType>({
	allData: [],
	plotData: [],
	selectedData: [],
	addSelectedData: () => {},
	removeSelectedData: () => {},
	setPlotData: () => {},
});
