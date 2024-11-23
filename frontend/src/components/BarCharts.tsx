import Plot from "react-plotly.js";

const BarChart = (props: {
  title: string;
  xLabel: string[];
  yValues: number[];
}) => {
  return (
    <div>
      <Plot
        data={[
          {
            type: "bar",
            x: props.xLabel,
            y: props.yValues,
            width: 0.2,
            marker: {
              color: "rgb(69,143,255)",
            },
          },
        ]}
        layout={{ width: 430, title: { text: props.title } }}
      />
    </div>
  );
};

export default BarChart;
