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
	const languageList: string[] = ["Deutsch", "FranzÃ¶sisch", "Italienisch"];
	const resourceList: string[] = [
		"Brief",
		"Autograph",
		"Archivmaterial / Archivdokument",
		"Buchhandschrift",
		"Archivmaterial / Dossier",
	];
	// const libraryList: string[] = ["Basel", "Solothurn"];

	const [subjectFormDist, setSubjectFormDist] = useState<number[]>([]);
	const [languageDist, setLanguageDist] = useState<number[]>([]);
	const [resourceTypeDist, setResourceTypeDist] = useState<number[]>([]);
	// const [placeStandardDist, setPlaceStandardDist] = useState<number[]>([]);

	useEffect(() => {
		setSubjectFormDist(
			subjectList.map(
				(subject) =>
					ctx.plotData.filter((f) =>
						f.subject_forms.includes(subject)
					).length
			)
		);

		setLanguageDist(
			languageList.map(
				(lang) =>
					ctx.plotData.filter((f) => f.languages.includes(lang))
						.length
			)
		);

		setResourceTypeDist(
			resourceList.map(
				(resource) =>
					ctx.plotData.filter((f) =>
						f.resource_types.includes(resource)
					).length
			)
		);

		// setPlaceStandardDist(
		// 	libraryList.map(
		// 		(library) =>
		// 			ctx.plotData.filter((f) => f.publication.city == library)
		// 				.length
		// 	)
		// );
	}, [ctx.plotData]);

	return (
		<>
			<Container>
				<h2 className="pb-2 text-xl font-semibold">
					Subject Form Distribution
				</h2>
				<BarChart yValues={subjectFormDist} xLabel={subjectList} />
			</Container>
			<Container>
				<h2 className="pb-2 text-xl font-semibold">
					Language Distribution
				</h2>
				<BarChart yValues={languageDist} xLabel={languageList} />
			</Container>
			<Container>
				<h2 className="pb-2 text-xl font-semibold">
					Resource Type Distribution
				</h2>
				<BarChart yValues={resourceTypeDist} xLabel={resourceList} />
			</Container>
			<Container>
				<h2 className="pb-2 text-xl font-semibold">
					Place Standardized
				</h2>
				<Plot
					className="size-full h-[calc(100%-2rem)]"
					data={[
						{
							type: "scattergeo",
							mode: "markers",
							locations: ["FRA", "DEU", "RUS", "ESP"],
							marker: {
								size: [20, 30, 15, 10],
								color: [10, 20, 40, 50],
								cmin: 0,
								cmax: 50,
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
					}}
				/>
			</Container>
		</>
	);
};

export default Visualisations;
