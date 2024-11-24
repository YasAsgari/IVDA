import Plot from "react-plotly.js";

type Props = { xLabel: string[]; yValues: number[]; className?: string };

export default function BarChart({ xLabel, yValues, className = "" }: Props) {
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
            color: "rgb(69,143,255)",
          },
        },
      ]}
      layout={{
        yaxis: {
          range: [0, null],
        },
        margin: { t: 5, b: 50, l: 0, r: 0, pad: 1 },
      }}
    />
  );
}
