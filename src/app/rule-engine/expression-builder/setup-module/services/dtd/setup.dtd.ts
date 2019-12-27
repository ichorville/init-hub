

// categories: [{id: 17, name: "Gender", moduleId: 1, codeAlias: "", nameAlias: "", descriptionAlias: "",…},…]
// id: 1
// isActive: true
// name: "General"
// rowVersion: 0

export interface SetupModuleDTD {
	id: number;
	isActive: boolean;
	name: string;
	categories: SetupCategoryDTD[];

	rowVersion: number;
}

export interface SetupCategoryDTD {
	id: number;
	moduleId: number;
	name: string;
	nameAlias: string;
	codeAlias: string;
	descriptionAlias: string;
	isActive: boolean;
	isStringCode: boolean;

	rowVersion: number;
}
