export interface MasterDataCommonDataDTD {
	id: number;
	code: string;
	codeAlias: string;
	name: string;
	nameAlias: string;
	description: string;
	descriptionAlias: string;
	categoryId: number;
	languageCode: string;
	endpoint: string;
	isBuiltin: boolean;
	isActive: boolean;
}


export interface MasterDataHospitalDTD {
	id: number;
	createdBy: string;
	createdDate: string;
	modifiedBy: string;
	modifiedDate: string;
	isActive: boolean;
	hospitalName: string;
}

export interface MasterDataNursingStationDTD {
	id: number;
	tenantId: number;
	createdBy: string;
	createdDate: string;
	modifiedBy: string;
	modifiedDate: string;
	isActive: boolean;
	description: string;
}

export interface MasterDataHospitalResponseDTD {
	status: 'OK';
	message: string;
	body: MasterDataHospitalDTD[];
}

export interface MasterDataHospitalByIDResponseDTD {
	id: number;
	name: string;
	alias: string;
	hospital_group_id: number;
	clinic: {
		id: number;
		clinicDescription: string;
		rowVersion: string;
		active: boolean

	}[];

}

export interface MasterDataNursingStationByIDResponseDTD {
	id: number;
	tenantId: number;
	hospitalId: number;
	createdBy: string;
	createdDate: string;
	modifiedBy: string;
	modifiedDate: string;
	rowVersion: number;
	isActive: boolean;
	revisionID: number;
	translationLanguages: any[];
	description: string;
	nursingGroup: NursingGroupsResponse;

}

export interface NursingGroupsResponse {

	id: number;
	tenantId: number;
	hospitalId: number;
	createdBy: string;
	createdDate: string;
	modifiedBy: string;
	modifiedDate: string;
	isActive: boolean;
	rowVersion: number;
	revisionID: number;
	translationLanguages: any[];
	description: string;

}


export interface MasterDataClinicDTD {
	id: number;
	createdBy: string;
	createdDate: string;
	modifiedBy: string;
	modifiedDate: string;
	isActive: boolean;
	clinicDescription: string;
}

export interface MasterDataClinicResponseDTD {
	status: 'OK';
	message: string;
	body: MasterDataClinicDTD[];
}


export interface SearchDoctorsRequestDTD {
	employeeIds?: number[];
	employeeNames?: string[];
	employeeAliases?: string[];
	hospitalIds?: number[];
	clinicIds?: number[];
	educationIds?: number[];
	qualificationIds?: number[];
	specializationIds?: number[];
}

export interface MasterDataDoctorDTD {
	employeeAlias: string;
	employeeHospitals: any[];
	employeeId: number;
	employeeName: string;
	employeeTitle: number;
	employeeType: number;
	gender: 'M' | 'F';
	tenantId: number;
}

export interface MasterDataDoctorByIDResponseDTD {
	employeeId: number;
	tenantId: number;
	employeeCode: string;
	employeeName: string;
	employeeAlias: string;
	isActive: boolean;
	isUpdateRequired: boolean;
	profilePicture: string;
	genderId: number;
	gender: 'Male' | 'Female' | 'Other';
	maritalStatus: 'S' | 'M';
	/**
	 * FORMAT: YYYY-MM-DD
	 */
	dateOfBirth: string;
	nationality: number;
	employeeTitle: number;
	employeeType: number;
	staffType: number;
	/**
	 * FORMAT: YYYY-MM-DD
	 */
	joinDate: string;
	mobilePhone: string;
	country: number;
	city: number;
	isSchedulable: boolean;
	doctor: {
		doctorsPreferredTimings: {
			id: number;
			isAllowWaitlist: number;
			numberOfWaitlist: number;
			isRegistered: boolean;
			firstSlotDuration: number;
			slotDurationInMinutes: number;
		};
	};
}


export interface NationalityDTD {
	id: number;
	description: string;
}


export interface ApptVisitTypeDTD {
	id: number;
	description: string;
}


export interface ApptPatientNoShowReasonDTD {
	id: number;
	description: string;
}

export interface ApptCancelReasonDTD {
	id: number;
	description: string;
}

export interface ApptRescheduleReasonDTD {
	id: number;
	description: string;
}


