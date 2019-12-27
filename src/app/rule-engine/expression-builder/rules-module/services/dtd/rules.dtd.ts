


export interface EndpointInfoDTD {
	id: number;
	serviceId: number;
	summary: string;
	endpoint: string;
	key: string;
	description: string;
	parameters: any[];
	isActive: boolean;
	rowVersion: number;
}


export type EndpointsByServiceResponseDTD = EndpointInfoDTD[];
