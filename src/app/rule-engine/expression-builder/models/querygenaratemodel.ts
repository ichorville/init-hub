export class QueryGenarateModel {
	fields = '';
	data: any;
	genaratedQuery: string;


	constructor(data: any, genaratedQuery: string, fields: string) {
		this.data = data;
		this.genaratedQuery = genaratedQuery;
		this.fields = fields;
	}
}
