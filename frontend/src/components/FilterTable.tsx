import {
	Badge,
	Button,
	Checkbox,
	Dropdown,
	Table,
	TextInput,
	ToggleSwitch,
} from "flowbite-react";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import BookRecord from "../models/BookRecord";
import { BooksContext } from "../utils/BooksContext";

const FilterTable = () => {
	const ctx = useContext(BooksContext);

	const [displayData, setDisplayData] = React.useState<BookRecord[]>(
		ctx.allData
	);
	const [showSelected, setShowSelected] = React.useState(false);

	// Constants from filtered Data
	const languageList: string[] = ["Deutsch", "FranzÃ¶sisch", "Italienisch"];
	const subjectList: string[] = [
		"Autograf",
		"Handschrift",
		"Briefsammlung",
		"Briefsammlun",
	];
	const libraryList: string[] = ["Basel", "Solothurn"];
	const resourceList: string[] = [
		"Brief",
		"Autograph",
		"Archivmaterial / Archivdokument",
		"Buchhandschrift",
		"Archivmaterial / Dossier",
	];

	const [selectedLanguages, setSelectedLanguages] =
		React.useState(languageList);
	const [selectedSubjects, setSelectedSubjects] = React.useState(subjectList);
	const [selectedLibraries, setSelectedLibraries] =
		React.useState(libraryList);
	const [selectedResources, setSelectedResources] =
		React.useState(resourceList);

	// Initial setup
	// useLayoutEffect(() => {
	// 	console.log(
	// 		ctx.allData
	// 			.map((e) => e.publication.city)
	// 			.flat(1)
	// 			.filter((value, index, array) => array.indexOf(value) === index)
	// 	);
	// }, [ctx.allData]);

	const applyFilter = () => {
		const filteredData = ctx.allData.filter((e) => {
			const isLanguage = e.languages.some((item) =>
				selectedLanguages.includes(item)
			);
			const isSubject = e.subject_forms.some((item) =>
				selectedSubjects.includes(item)
			);
			const isResource = e.resource_types.some((item) =>
				selectedResources.includes(item)
			);

			const isLibrary = selectedLibraries.includes(e.publication.city);

			const isSelected = ctx.selectedData.includes(e) || !showSelected;

			return (
				isLanguage && isSubject && isResource && isLibrary && isSelected
			);
		});
		setDisplayData(filteredData);
	};

	useEffect(() => {
		applyFilter();
	}, [
		selectedLanguages,
		selectedSubjects,
		selectedLibraries,
		selectedResources,
		showSelected,
		ctx.allData,
		ctx.selectedData,
	]);

	const handleSearch = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// TODO
		console.log("Search Called - Implement Function");
	};

	const dropDownHandler = (
		label: string,
		mapList: string[],
		selectedArray: string[],
		setSelectedArray: Dispatch<SetStateAction<string[]>>
	) => {
		return (
			<Dropdown color={"black"} label={label} dismissOnClick={false}>
				{mapList.map((element) => {
					return (
						<Dropdown.Item key={element}>
							<Checkbox
								defaultChecked={selectedArray.includes(element)}
								onChange={() => {
									if (selectedArray.includes(element))
										setSelectedArray(
											selectedArray.filter(
												(a) => a !== element
											)
										);
									else
										setSelectedArray([
											...selectedArray,
											element,
										]);
								}}
							/>{" "}
							&nbsp; {element}
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
					checked={showSelected}
					onChange={() => setShowSelected(!showSelected)}
					label="Only Selected"
				/>
			</div>
			<div className="flex flex-row justify-between pb-2">
				<TextInput
					onSubmit={handleSearch}
					placeholder="Search Title..."
					className="w-96"
				/>
				{/* <form className="" onSubmit={handleSearch}> */}
				{/* <input
						type="text"
						id="simple-search"
						className="block w-full max-w-[25rem] rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
						placeholder="Search Title..."
					/> */}
				{/* </form> */}
				{dropDownHandler(
					"Languages",
					languageList,
					selectedLanguages,
					setSelectedLanguages
				)}
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
			<div className="h-[calc(100%-6.5rem)] overflow-x-auto rounded-lg border border-gray-300">
				<Table hoverable>
					<Table.Head>
						<Table.HeadCell className="p-4">
							{/* <Checkbox /> */}
						</Table.HeadCell>
						<Table.HeadCell>Swiss Id</Table.HeadCell>
						<Table.HeadCell>Title</Table.HeadCell>
						<Table.HeadCell>Language</Table.HeadCell>
						<Table.HeadCell>Resource Type</Table.HeadCell>
						<Table.HeadCell>Issue Date</Table.HeadCell>
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
						{displayData.map((element) => {
							return (
								<Table.Row
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
									key={element.id}
								>
									<Table.Cell className="p-4">
										<Checkbox
											onChange={() => {
												const currentIndex =
													ctx.selectedData.indexOf(
														element
													);

												if (currentIndex == -1) {
													ctx.addSelectedData(
														element
													);
												} else {
													ctx.removeSelectedData(
														element
													);
												}
											}}
											checked={ctx.selectedData.includes(
												element
											)}
										/>
									</Table.Cell>
									<Table.Cell className="px-0">
										{element.swiss_id}
									</Table.Cell>
									<Table.Cell>{element.title}</Table.Cell>
									<Table.Cell className="px-0">
										{element.languages.join(",\n")}
									</Table.Cell>
									<Table.Cell className="flex flex-row flex-wrap gap-2 p-1">
										{element.resource_types.map((r, i) => (
											<Badge
												color="blue"
												size="xs"
												key={i}
											>
												{r}
											</Badge>
										))}
									</Table.Cell>
									<Table.Cell>
										{element.publication.year}
									</Table.Cell>
									<Table.Cell>
										<Button
											color="blue"
											className="size-8 rounded-lg p-0"
										>
											i{/* <img src="/Button.svg" /> */}
										</Button>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		</>
	);
};

export default FilterTable;
