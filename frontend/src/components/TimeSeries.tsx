import { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import ReactSlider from "react-slider";
import { BooksContext } from "../utils/BooksContext";

const TimeSeries = () => {
	const ctx = useContext(BooksContext);
	const bin_size = 5;

	const [data, setData] = useState<{ year: number; count: number }[]>([]);
	const [colors, setColors] = useState<string[]>([]);

	useEffect(() => {
		const tempData = [];

		for (let i: number = ctx.time.min; i < ctx.time.max; i += bin_size) {
			tempData.push({
				year: i,
				count: ctx.allData.filter(
					(e) =>
						i <= e.publication.year &&
						e.publication.year < i + bin_size
				).length,
			});
		}

		setData(tempData);
		setColors(new Array(tempData.length).fill("#007bff"));
	}, [ctx.allData, ctx.time.min, ctx.time.max]);

	useEffect(() => {
		setColors(
			data.map((d) =>
				ctx.time.filter_min <= d.year && d.year < ctx.time.filter_max
					? "#007bff"
					: "lightgray"
			)
		);
	}, [ctx.time.filter_min, ctx.time.filter_max]);

	return (
		<div className="mx-2">
			<h2 className="text-lg font-semibold">
				Publication Year Distribution
			</h2>
			<Plot
				className="h-24 w-full bg-white"
				data={[
					{
						x: data.map((d) => d.year),
						y: data.map((d) => d.count),
						type: "bar",
						marker: {
							color: colors.length > 0 ? colors : "#007bff",
							line: {
								color: "white",
								width: 1,
							},
						},
					},
				]}
				layout={{
					margin: {
						t: 10,
						b: 15,
						l: 25,
						r: 15,
					},
				}}
				config={{
					displayModeBar: false, // Hides the mode bar
				}}
			/>

			<ReactSlider
				value={[ctx.time.filter_min, ctx.time.filter_max]}
				onChange={(value) => {
					ctx.setFilterTimeMin((value as [number, number])[0]);
					ctx.setFilterTimeMax((value as [number, number])[1]);
				}}
				min={ctx.time.min}
				max={ctx.time.max}
				step={bin_size}
				className="ml-3 mt-1 h-1 rounded bg-gray-200"
				renderThumb={(props, state) => (
					<div {...props} key={state.index}>
						<div className="relative -top-0.5 left-1.5 size-3 cursor-grab rounded-full bg-[#007bff]"></div>
						<div className="relative -top-px text-xs">
							{state.valueNow}
						</div>
					</div>
				)}
			/>
		</div>
	);
};

export default TimeSeries;
