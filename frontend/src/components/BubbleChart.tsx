import Plot from "react-plotly.js";

const BubbleChart = (plotData: {
  locations: string[];
  size: number[];
  color: number[];
}) => {
  return (
    <div>
      <Plot
        data={[
          {
            type: "scattergeo",
            mode: "markers",
            text: plotData.size.map((e) => e.toString()),
            locations: plotData.locations,
            marker: {
              size: plotData.size,
              color: plotData.color,
              cmin: 0,
              cmax: 100,
              colorscale: "Greens",
              //   colorbar: {
              //     title: "Frequency",
              //   },
              line: {
                color: "black",
              },
            },
            name: "europe data",
          },
        ]}
        layout={{
          width: 430,
          geo: {
            scope: "europe",
            resolution: 50,
          },
        }}
      />
    </div>
  );
};

export default BubbleChart;
