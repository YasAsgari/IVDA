type BookRecord = {
	id: number;
	title: string;
	swiss_id: number;
	// TODO: What is series??
	series: string;
	languages: string[];
	subject_forms: string[];
	physical_description: string;
	current_library: {
		address: string;
		lat: number;
		lng: number;
	};
	resource_types: string[];
	publication: {
		city: string;
		year: number;
		lat: number;
		lng: number;
		iso: string;
	};
	tsne_coordinates: {
		color: number;
		x: number;
		y: number;
	};
};

export default BookRecord;
