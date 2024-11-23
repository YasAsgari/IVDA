import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarChart from "./BarCharts";
import BubbleChart from "./BubbleChart";

const Visualisations = () => {
  const visual1 = useFullScreenHandle();
  const visual2 = useFullScreenHandle();
  const visual3 = useFullScreenHandle();
  const visual4 = useFullScreenHandle();

  // @ts-ignore
  const renderHelper = (visual, Comp, props) => (
    <div onClick={() => (visual.active ? visual.exit() : visual.enter())}>
      <Comp {...props} />
    </div>
    // <FullScreen
    //   handle={visual}
    //   className={`${
    //     !visual.active
    //       ? "w-3/12"
    //       : "w-full flex flex-row items-center justify-center bg-white"
    //   } px-8`}
    // >

    // </FullScreen>
  );
  return (
    <div className="flex flex-row justify-between items-center py-8">
      {renderHelper(visual1, BarChart, {
        yValues: [1, 2, 3],
        xLabel: ["A", "B", "C"],
        title: "Subject Form Distribution",
      })}
      {renderHelper(visual2, BarChart, {
        yValues: [1, 2, 3],
        xLabel: ["A", "B", "C"],
        title: "Language Distribution",
      })}
      {renderHelper(visual3, BarChart, {
        yValues: [1, 2, 3],
        xLabel: ["A", "B", "C"],
        title: "Resource Type Distribution",
      })}
      {renderHelper(visual4, BubbleChart, {
        // Map geolocation to Code from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
        locations: ["FRA", "DEU", "RUS", "ESP"],
        // int(Frequency/10) Or some other binning strategy
        size: [20, 30, 15, 10],
        // int(Frequency/10)
        color: [10, 20, 40, 50],
      })}
    </div>
  );
};

export default Visualisations;
