import { Dropdown } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { BooksContext } from "../utils/BooksContext";
import BarChart from "./BarChart";
import Container from "./Container";
import {
  subject_mapping,
  language_mapping,
  resource_mapping,
} from "../utils/constants";
import Information from "./Information";

const Visualisations = () => {
  const ctx = useContext(BooksContext);

  const subjectList: string[] = Object.keys(subject_mapping);
  const languageList: string[] = Object.keys(language_mapping);
  const resourceList: string[] = Object.keys(resource_mapping);

  const [countriesList, setCountriesList] = useState<string[]>([]);

  const [subjectFormDist, setSubjectFormDist] = useState<number[]>([]);
  const [languageDist, setLanguageDist] = useState<number[]>([]);
  const [resourceTypeDist, setResourceTypeDist] = useState<number[]>([]);
  const [countryDist, setCountryDist] = useState<number[]>([]);

  useEffect(() => {
    const uniqueCountryCodes: string[] = [
      ...new Set(ctx.plotData.map((f) => f.publication.iso)),
    ];

    setSubjectFormDist(
      subjectList.map(
        (subject) =>
          ctx.plotData.filter((f) => f.subject_forms.includes(subject)).length
      )
    );

    setLanguageDist(
      languageList.map(
        (lang) => ctx.plotData.filter((f) => f.languages.includes(lang)).length
      )
    );

    setResourceTypeDist(
      resourceList.map(
        (resource) =>
          ctx.plotData.filter((f) => f.resource_types.includes(resource)).length
      )
    );

    setCountriesList(uniqueCountryCodes);
    setCountryDist(
      uniqueCountryCodes.map(
        (countryCode) =>
          ctx.plotData.filter((f) => f.publication.iso === countryCode).length
      )
    );
  }, [ctx.plotData]);

  return (
    <>
      <Section
        title="Subject Form Distribution"
        xLabels={Object.keys(subject_mapping).map((e) => subject_mapping[e])}
        yValues={subjectFormDist}
      />
      <Section
        title="Language Distribution"
        xLabels={Object.keys(language_mapping).map((e) => language_mapping[e])}
        yValues={languageDist}
      />
      <Section
        title="Resource Type Distribution"
        xLabels={Object.keys(resource_mapping).map((e) => resource_mapping[e])}
        yValues={resourceTypeDist}
      />
      <Container>
        <div className="flex flex-row">
          <h2 className="pb-2 text-lg font-semibold mr-4">
            Place Standardized
          </h2>
          <Information description="This is the place where the artifact is found" />
        </div>
        <Plot
          className="h-[calc(100%-2rem)] w-full"
          config={{ displayModeBar: false }}
          data={[
            {
              type: "choropleth",
              locations: countriesList,
              z: countryDist,
              colorscale: [
                [0, "rgb(208, 227, 255)"],
                [0.2, "rgb(120, 180, 255)"],
                [0.4, "rgb(0, 123, 255)"],
                [0.6, "rgb(2, 111, 227)"],
                [0.8, "rgb(0, 88, 181)"],
                [1, "rgb(1, 61, 125)"],
              ],
              name: "europe data",
            },
          ]}
          layout={{
            geo: {
              scope: "europe",
              resolution: 50,
            },
            margin: { t: 1, b: 1, l: 0, r: 0, pad: 0 },
          }}
        />
      </Container>
    </>
  );
};

const getCategoryOrder = (type: string) => {
  if (type === "Descending") return "total descending";
  else if (type === "Ascending") return "total ascending";
  else return "category ascending";
};

type SectionProps = {
  title: string;
  yValues: number[];
  xLabels: string[];
};
function Section({ title, yValues, xLabels: xValues }: SectionProps) {
  const sortingOptions = ["Alphabetical", "Ascending", "Descending"];
  const typeOptions: Array<"linear" | "log"> = ["linear", "log"];

  const [sorting, setSorting] = useState("Alphabetical");
  const [type, setType] = useState<"linear" | "log">("linear");

  return (
    <Container>
      <div className="flex flex-row items-center pb-2">
        <h2 className="mr-auto text-lg font-semibold">{title}</h2>
        <Dropdown color={"black"} label={"Y-axis:"} dismissOnClick={false}>
          {typeOptions.map((element) => {
            return (
              <Dropdown.Item key={element} onClick={() => setType(element)}>
                {element}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
        <Dropdown color={"black"} label={"Sort:"} dismissOnClick={false}>
          {sortingOptions.map((element) => {
            return (
              <Dropdown.Item key={element} onClick={() => setSorting(element)}>
                {element}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </div>
      <BarChart
        yValues={yValues}
        xLabel={xValues}
        type={type}
        categoryOrder={getCategoryOrder(sorting)}
      />
    </Container>
  );
}

export default Visualisations;
