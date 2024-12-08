import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Modal,
  Pagination,
  Table,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import BookRecord from "../models/BookRecord";
import { BooksContext } from "../utils/BooksContext";
import Information from "./Information";
import Fuse from "fuse.js";
import {
  language_mapping,
  subject_mapping,
  resource_mapping,
  Library,
} from "../utils/constants";

const FilterTable = () => {
  const ctx = useContext(BooksContext);
  const pageSize = 250;

  const [showSelected, setShowSelected] = React.useState(false);
  const [displayData, setDisplayData] = React.useState<BookRecord[]>([]);

  React.useEffect(() => {
    setDisplayData(ctx.filteredData);
  }, [ctx.filteredData]);

  const fuse = new Fuse(displayData, {
    keys: ["title", "series"],
  });

  const libraryList: string[] = Library;
  const languageList: string[] = Object.keys(language_mapping);
  const subjectList: string[] = Object.keys(subject_mapping);
  const resourceList: string[] = Object.keys(resource_mapping);

  const [selectedLibraries, setSelectedLibraries] = React.useState(libraryList);
  const [selectedLanguages, setSelectedLanguages] = React.useState(
    Object.keys(language_mapping)
  );
  const [selectedSubjects, setSelectedSubjects] = React.useState(
    Object.keys(subject_mapping)
  );
  const [selectedResources, setSelectedResources] = React.useState(
    Object.keys(resource_mapping)
  );

  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<BookRecord | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  const applyFilter = () => {
    const filteredData = ctx.allData.filter((e) => {
      if (
        e.publication.year < ctx.time.filter_min ||
        e.publication.year >= ctx.time.filter_max
      )
        return false;

      if (!e.languages.some((item) => selectedLanguages.includes(item)))
        return false;

      if (!e.subject_forms.some((item) => selectedSubjects.includes(item)))
        return false;

      if (!e.resource_types.some((item) => selectedResources.includes(item)))
        return false;

      if (
        !selectedLibraries.some((library) =>
          e.current_library.address.includes(library)
        )
      )
        return false;

      return ctx.selectedData.includes(e) || !showSelected;
    });

    ctx.setFilteredData(filteredData);
  };

  useEffect(() => {
    applyFilter();
    setCurrentPage(1);
  }, [
    selectedLanguages,
    selectedSubjects,
    selectedLibraries,
    selectedResources,
    showSelected,
    ctx.time,
    ctx.allData,
    ctx.selectedData,
  ]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setDisplayData(fuse.search(e.target.searchString.value).map((e) => e.item));
  };

  const dropDownHandler = (
    label: string,
    mapList: string[],
    selectedArray: string[],
    setSelectedArray: Dispatch<SetStateAction<string[]>>,
    mapping?: { [key: string]: string }
  ) => {
    return (
      <Dropdown color={"black"} label={label} dismissOnClick={false}>
        {mapList.map((element) => {
          return (
            <Dropdown.Item key={element}>
              <Checkbox
                color="#007bff"
                defaultChecked={selectedArray.includes(element)}
                onChange={() => {
                  if (selectedArray.includes(element))
                    setSelectedArray(
                      selectedArray.filter((a) => a !== element)
                    );
                  else setSelectedArray([...selectedArray, element]);
                }}
              />
              &nbsp; {mapping ? mapping[element] : element}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="pb-4 text-4xl font-bold">FacetForge</h1>
        <ToggleSwitch
          color="blue"
          checked={showSelected}
          onChange={() => setShowSelected(!showSelected)}
          label="Only Selected"
        />
      </div>
      <div className="flex flex-row justify-between pb-2">
        <form onSubmit={handleSearch}>
          <TextInput
            placeholder="Search Title..."
            className="w-96"
            name="searchString"
            id="searchString"
          />
        </form>
        {dropDownHandler(
          "Languages",
          languageList,
          selectedLanguages,
          setSelectedLanguages,
          language_mapping
        )}
        {dropDownHandler(
          "Subject Form",
          subjectList,
          selectedSubjects,
          setSelectedSubjects,
          subject_mapping
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
          setSelectedResources,
          resource_mapping
        )}
      </div>
      <div className="h-[calc(100%-9.5rem)] overflow-x-hidden rounded-lg border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4"></Table.HeadCell>
            <Table.HeadCell>
              Swiss Id{" "}
              <Information description="This id is used to uniquely identify the book." />
            </Table.HeadCell>
            <Table.HeadCell>
              Title <Information description="The title of the book." />
            </Table.HeadCell>
            <Table.HeadCell>
              Series{" "}
              <Information description="Name of the series the book belongs to." />
            </Table.HeadCell>
            <Table.HeadCell>
              Languages{" "}
              <Information description="Different languages of the books." />
            </Table.HeadCell>
            <Table.HeadCell>
              Resource Type{" "}
              <Information description="The type of the resource" />
            </Table.HeadCell>
            <Table.HeadCell>
              Issue Date{" "}
              <Information description="The date that the book was found." />
            </Table.HeadCell>
            <Table.HeadCell>Info</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {displayData.length == 0 && (
              <Table.Row>
                <Table.Cell colSpan={7} className="text-center">
                  No Data
                </Table.Cell>
              </Table.Row>
            )}
            {displayData
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((element) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={element.id}
                  >
                    <Table.Cell className="p-4">
                      <Checkbox
                        color="#007bff"
                        onChange={() => {
                          const currentIndex =
                            ctx.selectedData.indexOf(element);

                          if (currentIndex == -1) {
                            ctx.addSelectedData(element);
                          } else {
                            ctx.removeSelectedData(element);
                          }
                        }}
                        checked={ctx.selectedData.includes(element)}
                      />
                    </Table.Cell>
                    <Table.Cell className="px-0">{element.swiss_id}</Table.Cell>
                    <Table.Cell>{element.title}</Table.Cell>
                    <Table.Cell>
                      {element.series === "" ? "-" : element.series}
                    </Table.Cell>
                    <Table.Cell className="px-0">
                      {element.languages.map((r, i) => (
                        <Badge
                          className="m-1 w-fit"
                          color="blue"
                          size="xs"
                          key={i}
                        >
                          {r}
                        </Badge>
                      ))}
                    </Table.Cell>
                    <Table.Cell className="p-1">
                      <div className="flex flex-row flex-wrap place-items-center gap-2">
                        {element.resource_types.map((r, i) => (
                          <Badge color="blue" size="xs" key={i}>
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{element.publication.year}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color={"blue"}
                        className="size-8 rounded-lg bg-[#007bff] p-0"
                        onClick={() => {
                          setOpenModal(true);
                          setModalInfo(element);
                        }}
                      >
                        i
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>

      <div className="flex w-full items-center">
        Showing
        <span className="mx-1 font-bold">
          {(currentPage - 1) * pageSize + 1}
        </span>
        to
        <span className="mx-1 font-bold">
          {Math.min(currentPage * pageSize, displayData.length)}
        </span>
        of
        <span className="mx-1 font-bold">{displayData.length}</span>
        entries
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(displayData.length / pageSize)}
          onPageChange={onPageChange}
          className="ml-auto mr-0"
        />
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{modalInfo?.title}</Modal.Header>
        <Modal.Body>
          {!!modalInfo && (
            <>
              <p>{`\t\t\tSwiss ID: \t${modalInfo.swiss_id}`}</p>
              <p>{`\t\t\tSeries: \t${
                modalInfo.series === "" ? "-" : modalInfo.series
              }`}</p>
              <p>{`\t\t\tLanguages: \t${modalInfo.languages.join(", ")}`}</p>
              <p>{`\t\t\tSubject Forms: \t${modalInfo.subject_forms.join(
                ", "
              )}`}</p>
              <p>{`\t\t\tPhysical Description: \t${modalInfo.physical_description}`}</p>
              <p>{`\t\t\tLibrary Location: \t${modalInfo.current_library.address}`}</p>
              <p>{`\t\t\tResource Types: \t${modalInfo.resource_types.join(
                ", "
              )}`}</p>
              <p>{`\t\t\tPublication Year: \t${modalInfo.publication.year}`}</p>
              <p>{`\t\t\tPublication Location: \t${modalInfo.publication.city}`}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterTable;
