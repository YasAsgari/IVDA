import chroma from "chroma-js";
import { Data } from "plotly.js";
import { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import BookRecord from "../models/BookRecord";
import { BooksContext } from "../utils/BooksContext";

const TSNEPlot = () => {
  const ctx = useContext(BooksContext);

  const [plotData, setPlotData] = useState<Data[]>([]);
  const [groupData, setGroupData] = useState<BookRecord[][]>([]);
  const numColors = 5;
  const customColor = (index: number) =>
    chroma
      .scale("Spectral")
      .domain([0, numColors - 1])(index)
      .hex();

  // useEffect(() => {
  // 	ctx.setPlotData(selectedData);
  // }, [selectedData]);

  useEffect(() => {
    const newPlotData: Data[] = [];
    const newGroupData: BookRecord[][] = [];

    for (let i = 0; i < numColors; i++) {
      const unfilterdeGroup = ctx.allData.filter(
        (f) => f.tsne_coordinates.color == i && !ctx.filteredData.includes(f)
      );
      const filteredGroup = ctx.filteredData.filter(
        (f) => f.tsne_coordinates.color == i
      );

      newPlotData.push({
        x: unfilterdeGroup.map((item) => item.tsne_coordinates.x),
        y: unfilterdeGroup.map((item) => item.tsne_coordinates.y),
        // type: "scatter",
        mode: "markers",
        opacity: 0.5,
        marker: {
          size: 10,
          color: customColor(i),
        },
      });
      newPlotData.push({
        x: filteredGroup.map((item) => item.tsne_coordinates.x),
        y: filteredGroup.map((item) => item.tsne_coordinates.y),
        // type: "scatter",
        mode: "markers",
        opacity: 1,
        marker: {
          size: 10,
          color: customColor(i),
        },
      });
      newGroupData.push([...unfilterdeGroup]);
      newGroupData.push([...filteredGroup]);
    }

    setPlotData(newPlotData as Data[]);
    setGroupData(newGroupData);
  }, [ctx.allData, ctx.filteredData]);

  return (
    <>
      <h2 className="pb-2 text-xl font-semibold">TSNE Distribution</h2>
      <div
        id="tsne"
        className="h-[calc(100%-2rem)] overflow-hidden rounded-lg border border-gray-300"
      >
        <Plot
          data={plotData}
          layout={{
            xaxis: {
              visible: false,
            },
            yaxis: {
              visible: false,
            },
            showlegend: false,
            plot_bgcolor: "#e5ecf6",
            paper_bgcolor: "#e5ecf6",
          }}
          onSelected={(e) => {
            const newSelectedData: BookRecord[] = [];

            for (const selected of e.points) {
              newSelectedData.push(
                groupData[selected.curveNumber][selected.pointIndex]
              );
            }

            if (newSelectedData.length) ctx.setPlotData(newSelectedData);
          }}
          className="size-full"
        />
      </div>
    </>
  );
};

export default TSNEPlot;
