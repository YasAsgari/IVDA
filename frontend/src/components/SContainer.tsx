import Plot from "react-plotly.js";

const SContainer = ({
  plotData,
}: {
  plotData: {
    x: number[];
    y: number[];
    name: string;
    text: string[];
    color: string;
  }[];
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl pb-2">TSNE Distribution</h1>
      <Plot
        data={plotData.map((each) => ({
          x: each.x,
          y: each.y,
          mode: "markers",
          type: "scatter",
          marker: { size: 10, color: each.color },
          text: each.text,
          name: each.name,
        }))}
        layout={{
          width: 870,

          // can be used to hide grid
          //   xaxis: { visible: false, showgrid: true, title: "" },
          //   yaxis: { visible: false, showgrid: true },
        }}
      />
    </div>
  );
};

export default SContainer;
