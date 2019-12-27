export const DEFAULT = [
    {value: 'code', viewValue: 'Code'},
    {value: 'codeAlias', viewValue: 'Code Alias'},
    {value: 'description', viewValue: 'Description'},
    {value: 'descriptionAlias', viewValue: 'Description Alias'},
    {value: 'name', viewValue: 'Name'},
    {value: 'nameAlias', viewValue: 'Name Alias'}
];

export const CLINIC = [
    {value: 'id', viewValue: 'Id'},
    {value: 'tenantId', viewValue: 'Tenant Id'},
    {value: 'isActive', viewValue: 'Is Active'},
    {value: 'alias', viewValue: 'Alias'},
    {value: 'clinicDescription', viewValue: 'Clinic Description'}
];

export const AGE_GROUPS = [
    {value: 'id', viewValue: 'id'},
    {value: 'groupName', viewValue: 'Group Name'},
    {value: 'minAge', viewValue: 'Min Age'},
    {value: 'maxAge', viewValue: 'Max Age'},
    {value: 'clinicDescription', viewValue: 'Clinic Description'}
];

export const PROCEDURES = [
    {value: 'id', viewValue: 'Id'},
    {value: 'procedureId', viewValue: 'Procedure Id'},
    {value: 'name', viewValue: 'Name'},
    {value: 'alias', viewValue: 'Alias'},
    {value: 'categoryId', viewValue: 'Category Id'},
    {value: 'groupId', viewValue: 'Group Id'},
    {value: 'subGroupId', viewValue: 'SubGroup Id'},
    {value: 'languageCode', viewValue: 'Language Code'},
    {value: 'isMedicine', viewValue: 'Is Medicine'},
    {value: 'isPackageProcedure', viewValue: 'Is Package Procedure'},
    {value: 'isActive', viewValue: 'Is Active'}
];

export const DIAGNOSIS = [
    {value:'problemMasterRevisionID', viewValue:'Problem Master RevisionID'},
    {value:'problemMasterID', viewValue:'Problem MasterID'},
    {value:'problemCode', viewValue:'Problem Code'},
    {value:'problemName', viewValue:'Problem Name'},
    {value:'problemDescription', viewValue:'Problem Description'},
    {value:'problemType', viewValue:'Problem Type'},
    {value:'doctorID', viewValue:'DoctorID'},
    {value:'hospitalGroupID', viewValue:'Hospital Group ID'},
    {value:'hospitalID', viewValue:'HospitalID'},
    {value:'isActive', viewValue:'isActive'}
]


export const API_BINDINGS = [

  {value: 'age', viewValue: 'Age', type: 'EMPI'},
  {value: 'remarks', viewValue: 'Remarks', type: 'EMPI'},
  {value: 'upi', viewValue: 'MRN', type: 'EMPI'},
  {value: 'bloodGroup', viewValue: 'Blood Group', type: 'EMPI'},
  {value: 'firstName', viewValue: 'First Name', type: 'EMPI'},
  {value: 'lastName', viewValue: 'Last Name', type: 'EMPI'},
  {value: 'nationality', viewValue: 'Nationality', type: 'EMPI'},
  {value: 'phoneNumber', viewValue: 'Phone Number', type: 'EMPI'},
  {value: 'specialNeeds', viewValue: 'Special Needs', type: 'EMPI'},
  {value: 'referalRemarks', viewValue: 'referalRemarks', type: 'EMPI'},
  {value: 'dateOfBirth', viewValue: 'Date Of Birth', type: 'EMPI'},
  {value: 'gender', viewValue: 'Gender', type: 'EMPI'},
  {value: 'dateOfBirthHijri', viewValue: 'dateOfBirthHijri', type: 'EMPI'},
  {value: 'Infectious', viewValue: 'Infectious', type: 'PATIENT-CONDITION'},
  {value: 'vital-bmi', viewValue: 'BMI', type: 'VITAL-SIGNS'},
  {value: 'vital-weight', viewValue: 'Weight (kg)', type: 'VITAL-SIGNS'},
  {value: 'vital-height', viewValue: 'Height', type: 'VITAL-SIGNS'},
  {value: 'vital-tempreture', viewValue: 'Temperature(C)', type: 'VITAL-SIGNS'},
  {value: 'vital-systolic', viewValue: 'Systolic BP', type: 'VITAL-SIGNS'},
  {value: 'vital-diastolic', viewValue: 'Diastolic BP', type: 'VITAL-SIGNS'}

]
