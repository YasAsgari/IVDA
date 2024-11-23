import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarChart from "./BarCharts";

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
      {renderHelper(visual4, BarChart, {
        yValues: [1, 2, 3],
        xLabel: ["A", "B", "C"],
        title: "Place Standardized",
      })}
    </div>
  );
};

export default Visualisations;
