import { Dropdown } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { BooksContext } from "../utils/BooksContext";
import BarChart from "./BarChart";
import Container from "./Container";

const Visualisations = () => {
  const ctx = useContext(BooksContext);

  const subjectList: string[] = [
    "Autograf",
    "Handschrift",
    "Briefsammlung",
    "Briefsammlun",
  ];
  const languageList: string[] = [
    "Deutsch",
    "Französisch",
    "Italienisch",
    "Englisch",
    "Other",
  ];
  const resourceList: string[] = [
    "Brief",
    "Autograph",
    "Archivmaterial / Archivdokument",
    "Buchhandschrift",
    "Archivmaterial / Dossier",
  ];

  const [countriesList, setCountriesList] = useState<string[]>([]);

  const [subjectFormDist, setSubjectFormDist] = useState<number[]>([]);
  const [languageDist, setLanguageDist] = useState<number[]>([]);
  const [resourceTypeDist, setResourceTypeDist] = useState<number[]>([]);
  const [countryDist, setCountryDist] = useState<number[]>([]);

  useEffect(() => {
    const uniqueCountryCodes = [
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
        xLabels={subjectList}
        yValues={subjectFormDist}
      />
      <Section
        title="Language Distribution"
        xLabels={languageList}
        yValues={languageDist}
      />
      <Section
        title="Resource Type Distribution"
        xLabels={resourceList}
        yValues={resourceTypeDist}
      />
      <Container>
        <h2 className="pb-2 text-lg font-semibold">Place Standardized</h2>
        <Plot
          className="h-[calc(100%-2rem)] w-full"
          config={{ displayModeBar: false }}
          data={[
            {
              type: "choropleth",
              locations: ["FRA", "DEU", "RUS", "ESP", "AUT", "BEL"], //countriesList,
              z: [20, 30, 15, 10, 6], //countryDist.map((e) => Math.ceil(e / 50)),
              colorscale: [
                [0, "rgb(255, 255, 255)"],
                [0.35, "rgb(106, 137, 247)"],
                [0.5, "rgb(90, 120, 245)"],
                [0.6, "rgb(70, 100, 245)"],
                [0.7, "rgb(40, 60, 190)"],
                [1, "rgb(5, 10, 172)"],
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
