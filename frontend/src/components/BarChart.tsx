import Plot from "react-plotly.js";

type Props = {
  xLabel: string[];
  yValues: number[];
  categoryOrder: "total descending" | "total ascending" | "category ascending";
  type: "linear" | "log";
  className?: string;
};

export default function BarChart({
  xLabel,
  yValues,
  type = "linear",
  className = "",
  categoryOrder = "category ascending",
}: Props) {
  return (
    <Plot
      className={`size-full h-[calc(100%-2rem)] ${className}`}
      data={[
        {
          type: "bar",
          x: xLabel,
          y: yValues,
          width: 0.3,
          marker: {
            color: "#007bff",
          },
        },
      ]}
      layout={{
        yaxis: {
          range: [0, null],
          type: type,
        },
        margin: { t: 5, b: 60, l: 60, r: 30, pad: 1 },
        xaxis: { categoryorder: categoryOrder },
      }}
      config={{ displayModeBar: false }}
    />
  );
}
