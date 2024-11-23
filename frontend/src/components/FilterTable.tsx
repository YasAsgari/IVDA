import React from "react";
import { Dropdown, ToggleSwitch, Checkbox, Table } from "flowbite-react";

const FilterTable = () => {
  const testData = [
    {
      "swiss-id": 1,
      title: "Test Title Test Title Test Title Test Title",
      language: ["French", "English"],
      subject: ["Article"],
      library: "Bern",
      type: "article",
      "resource-type": ["journal"],
      "issue-date": "12-10-20204",
    },
    {
      "swiss-id": 2,
      title: "Test Title 2",
      language: ["English"],
      subject: ["Article"],
      library: "Bern",
      type: "article",
      "resource-type": ["journal"],
      "issue-date": "12-10-20204",
    },
    {
      "swiss-id": 3,
      title: "Test Title 3",
      language: ["French"],
      subject: ["Article"],
      library: "Bern",
      type: "article",
      "resource-type": ["journal"],
      "issue-date": "12-10-20204",
    },
  ];

  const [displayData, setDisplayData] = React.useState(testData);
  const [showSelected, setShowSelected] = React.useState(false);

  // Constants from filtered Data
  const languageList: String[] = ["French", "English", "Spanish"];
  const typeList: String[] = ["article", "News", "Journal"];
  const subjectList: String[] = ["Article", "Test", "Journal"];
  const libraryList: String[] = ["Bern", "Zurich", "Berlin"];
  const resourceList: String[] = ["journal", "News", "Resource"];

  const [selectedLanguages, setSelectedLanguages] =
    React.useState(languageList);
  const [selectedSubjects, setSelectedSubjects] = React.useState(subjectList);
  const [selectedLibraries, setSelectedLibraries] = React.useState(libraryList);
  const [selectedTypes, setSelectedTypes] = React.useState(typeList);
  const [selectedResources, setSelectedResources] =
    React.useState(resourceList);

  const applyFilter = () => {
    const filteredData = testData.filter((e) => {
      const isLanguage = e.language.some((item) =>
        selectedLanguages.includes(item)
      );
      const isSubject = e.subject.some((item) =>
        selectedSubjects.includes(item)
      );
      const isResource = e["resource-type"].some((item) =>
        selectedResources.includes(item)
      );

      const isLibrary = selectedLibraries.includes(e.library);
      const isType = selectedTypes.includes(e.type);

      return isLanguage && isSubject && isResource && isLibrary && isType;
    });
    setDisplayData(filteredData);
  };

  React.useEffect(() => {
    applyFilter();
  }, [
    selectedLanguages,
    selectedSubjects,
    selectedLibraries,
    selectedTypes,
    selectedResources,
  ]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Search Called - Implement Function");
  };

  const dropDownHandler = (
    label: String,
    mapList: String[],
    selectedArray: String[],
    setSelectedArray: Function
  ) => {
    return (
      <Dropdown color={"black"} label={label} dismissOnClick={false}>
        {mapList.map((element) => {
          return (
            // @ts-ignore
            <Dropdown.Item key={element}>
              <input
                type="checkbox"
                defaultChecked={selectedArray.includes(element)}
                onChange={() => {
                  if (selectedArray.includes(element))
                    setSelectedArray(
                      selectedArray.filter((a) => a !== element)
                    );
                  else setSelectedArray([...selectedArray, element]);
                }}
              />
              &nbsp; {element}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl pb-4">FacetForge</h1>
        <ToggleSwitch
          checked={showSelected}
          onChange={() => setShowSelected(!showSelected)}
          label="Only Selected"
        />
      </div>
      <div className="flex flex-row justify-between pb-2">
        <form className="flex items-center" onSubmit={handleSearch}>
          <input
            type="text"
            id="simple-search"
            className="max-w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            placeholder="Search Title..."
          />
        </form>
        {dropDownHandler(
          "Languages",
          languageList,
          selectedLanguages,
          setSelectedLanguages
        )}
        {dropDownHandler("Type", typeList, selectedTypes, setSelectedTypes)}
        {dropDownHandler(
          "Subject Form",
          subjectList,
          selectedSubjects,
          setSelectedSubjects
        )}
        {dropDownHandler(
          "Library",
          libraryList,
          selectedLibraries,
          setSelectedLibraries
        )}
        {dropDownHandler(
          "Resource Type",
          resourceList,
          selectedResources,
          setSelectedResources
        )}
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>Swiss Id</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Language</Table.HeadCell>
            <Table.HeadCell>Resource Type</Table.HeadCell>
            <Table.HeadCell>Issue Date</Table.HeadCell>
            <Table.HeadCell>{""}</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {displayData.map((element) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={element["swiss-id"]}
                >
                  <Table.Cell className="p-4">
                    <Checkbox
                      onClick={(e) => {
                        console.log(e);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {element["swiss-id"]}
                  </Table.Cell>
                  <Table.Cell>{element.title}</Table.Cell>
                  <Table.Cell>{element.language}</Table.Cell>
                  <Table.Cell>{element["resource-type"]}</Table.Cell>
                  <Table.Cell>{element["issue-date"]}</Table.Cell>
                  <Table.Cell>
                    <img src="/Button.svg" />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default FilterTable;
