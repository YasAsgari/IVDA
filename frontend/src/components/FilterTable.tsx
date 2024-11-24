import {
	Badge,
	Button,
	Checkbox,
	Dropdown,
	Modal,
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

const FilterTable = () => {
	const ctx = useContext(BooksContext);

	const [displayData, setDisplayData] = React.useState<BookRecord[]>(
		ctx.allData
	);
	const [showSelected, setShowSelected] = React.useState(false);

	// Constants from filtered Data
	const languageList: string[] = [
		"Deutsch",
		"Französisch",
		"Italienisch",
		"Englisch",
		"Other",
	];
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
	const [openModal, setOpenModal] = useState(false);
	const [modalInfo, setModalInfo] = useState<BookRecord | undefined>(
		undefined
	);

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
		ctx.setFilteredData(filteredData);
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
							/>
							&nbsp; {element}
						</Dropdown.Item>
					);
				})}
			</Dropdown>
		);
	};

	const ShowModal = () => {
		return (
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Document Details</Modal.Header>
				<Modal.Body>
					{!!modalInfo && (
						<div>
							<span>{modalInfo.title}: &emsp; </span>

							<p>{`\t\t\tSwiss ID: \t${modalInfo.swiss_id}`}</p>
							<p>{`\t\t\tSeries: \t${modalInfo.series === "" ? "-" : modalInfo.series}`}</p>
							<p>{`\t\t\tLanguages: \t${modalInfo.languages.join(", ")}`}</p>
							<p>{`\t\t\tSubject Forms: \t${modalInfo.subject_forms.join(", ")}`}</p>
							<p>{`\t\t\tPhysical Description: \t${modalInfo.physical_description}`}</p>
							<p>{`\t\t\tLibrary Location: \t${modalInfo.current_library.address}`}</p>
							<p>{`\t\t\tResource Types: \t${modalInfo.resource_types.join(", ")}`}</p>
							<p>{`\t\t\tPublication Year: \t${modalInfo.publication.year}`}</p>
							<p>{`\t\t\tPublication Location: \t${modalInfo.publication.city}`}</p>
						</div>
					)}
				</Modal.Body>
			</Modal>
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
										{element.languages.map((r, i) => (
											<Badge
												className="w-fit m-1"
												color="green"
												size="xs"
												key={i}
											>
												{r}
											</Badge>
										))}
										{/* {element.languages.join(",\n")} */}
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
				{ShowModal()}
			</div>
		</>
	);
};

export default FilterTable;
