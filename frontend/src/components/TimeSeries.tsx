import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../utils/BooksContext";
import { min, max } from "d3";
import ReactSlider from "react-slider";

const TimeSeries = ({
  range,
  setRange,
}: {
  range: [number, number];
  setRange: Function;
}) => {
  const ctx = useContext(BooksContext);

  const [data, setData] = useState<{ year: number; count: number }[]>([]);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  useEffect(() => {
    const tempData = [];
    const dates = [
      ...new Set(ctx.allData.map((element) => element.publication.year)),
    ];
    setMinDate(min(dates) || 0);
    setMaxDate(max(dates) || 0);

    for (let i: number = minDate; i < maxDate; i += 5) {
      if (!dates.includes(i)) tempData.push({ year: i, count: i });
      else {
        tempData.push({
          year: i,
          count: ctx.allData.filter(
            (e) => i <= e.publication.year && e.publication.year < i + 5
          ).length,
        });
      }
    }

    setRange([minDate, maxDate]);
    setData([...tempData]);
  }, [ctx.allData]);

  return (
    <div className="mx-2">
      <div className="flex mx-2 items-end border-b-2 border-red-400">
        {data.map((element) => (
          <div
            key={element.year}
            className="flex-1"
            onMouseEnter={() => setHoverIndex(element.year)}
            onMouseLeave={() => setHoverIndex(-1)}
            style={{
              height: `${Math.ceil(element.count / 15)}px`,
              backgroundColor:
                range[0] <= element.year && element.year <= range[1]
                  ? "#007bff"
                  : "#ddd",
            }}
          >
            {hoverIndex === element.year && (
              <div className="relative py-1 -translate-x-1/2 left-2/4 bottom-7 px-2 bg-gray-800 text-white rounded text-xs z-10 whitespace-nowrap">
                {element.count}
              </div>
            )}
          </div>
        ))}
      </div>

      <ReactSlider
        value={range}
        onChange={(value) => setRange(value as [number, number])}
        min={minDate}
        max={maxDate}
        step={5}
        className="h-1 rounded mt-1 bg-gray-200"
        trackClassName="bg-blue-400"
        renderThumb={(props, state) => (
          <div {...props}>
            <div className="relative h-3 w-3 cursor-grab left-1.5 -top-0.5 rounded-full bg-blue-400"></div>
            <div className="relative -top-px text-xs">{state.valueNow}</div>
          </div>
        )}
      />
    </div>
  );
};

export default TimeSeries;
