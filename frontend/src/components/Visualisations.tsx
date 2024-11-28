import { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { BooksContext } from "../utils/BooksContext";
import BarChart from "./BarChart";
import Container from "./Container";
import { Dropdown } from "flowbite-react";

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

  const [sortingSubject, setSortingSubject] = useState("Alphabetical");
  const [sortingLanguage, setSortingLanguage] = useState("Alphabetical");
  const [sortingResource, setSortingResource] = useState("Alphabetical");

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

  const getCategoryOrder = (type: string) => {
    if (type === "Descending") return "total descending";
    else if (type === "Ascending") return "total ascending";
    else return "category ascending";
  };

  return (
    <>
      <Container>
        <div className="flex flex-row justify-between">
          <h2 className="pb-2 text-xl font-semibold">
            Subject Form Distribution
          </h2>
          <Dropdown color={"black"} label={"Sort:"} dismissOnClick={false}>
            {["Alphabetical", "Ascending", "Descending"].map((element) => {
              return (
                <Dropdown.Item
                  key={element}
                  onClick={() => setSortingSubject(element)}
                >
                  &nbsp; {element}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <BarChart
          yValues={subjectFormDist}
          xLabel={subjectList}
          categoryOrder={getCategoryOrder(sortingSubject)}
        />
      </Container>
      <Container>
        <div className="flex flex-row justify-between">
          <h2 className="pb-2 text-xl font-semibold">Language Distribution</h2>
          <Dropdown color={"black"} label={"Sort:"} dismissOnClick={false}>
            {["Alphabetical", "Ascending", "Descending"].map((element) => {
              return (
                <Dropdown.Item
                  key={element}
                  onClick={() => setSortingLanguage(element)}
                >
                  &nbsp; {element}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <BarChart
          yValues={languageDist}
          xLabel={languageList}
          categoryOrder={getCategoryOrder(sortingLanguage)}
        />
      </Container>
      <Container>
        <div className="flex flex-row justify-between">
          <h2 className="pb-2 text-xl font-semibold">
            Resource Type Distribution
          </h2>
          <Dropdown color={"black"} label={"Sort:"} dismissOnClick={false}>
            {["Alphabetical", "Ascending", "Descending"].map((element) => {
              return (
                <Dropdown.Item
                  key={element}
                  onClick={() => setSortingResource(element)}
                >
                  &nbsp; {element}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <BarChart
          yValues={resourceTypeDist}
          xLabel={resourceList}
          categoryOrder={getCategoryOrder(sortingResource)}
        />
      </Container>
      <Container>
        <h2 className="pb-2 text-xl font-semibold">Place Standardized</h2>
        <Plot
          className="w-full h-[calc(100%-2rem)]"
          data={[
            {
              type: "scattergeo",
              mode: "markers",
              locations: countriesList,
              marker: {
                size: countryDist.map((e) => Math.ceil(e / 50)),
                color: countryDist,
                cmin: 0,
                cmax: 100,
                line: {
                  color: "black",
                },
              },
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

export default Visualisations;
