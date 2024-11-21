import { ReactElement } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Visualisations = () => {
  const visual1 = useFullScreenHandle();
  const visual2 = useFullScreenHandle();
  const visual3 = useFullScreenHandle();
  const visual4 = useFullScreenHandle();

  const SampleComp = () => <img src="/Sample.svg" height={1200} width={1200} />;

  // @ts-ignore
  const renderHelper = (visual, Comp) => (
    <FullScreen
      handle={visual}
      className={`${
        !visual.active
          ? "w-3/12"
          : "w-full flex flex-row items-center justify-center bg-white"
      } px-8`}
    >
      <div onClick={() => (visual.active ? visual.exit() : visual.enter())}>
        <Comp />
      </div>
    </FullScreen>
  );
  return (
    <div className="flex flex-row justify-between items-center py-8">
      {renderHelper(visual1, SampleComp)}
      {renderHelper(visual2, SampleComp)}
      {renderHelper(visual3, SampleComp)}
      {renderHelper(visual4, SampleComp)}
    </div>
  );
};

export default Visualisations;
