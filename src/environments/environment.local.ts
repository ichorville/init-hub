// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const API_GATEWAY = {
  SERVER: "/proxy"
};

const MASTER_DATA_SERVICE_API_URL = `${ API_GATEWAY.SERVER }/csi-pms-rms-masterdata`;
const RULES_SERVICE_API_URL = `${ API_GATEWAY.SERVER }/csi-pms-rms-rules`;
const AUTH_SERVICE_API_URL = `${API_GATEWAY}/iam/auth/realms/csi`;

export const environment = {
  production: false,
  envName: 'local',
  API_URL: {
    MASTER_DATA: {
      GETALL: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/getAll`,
      GETBYID: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/getById`,
      GETBYIDS: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/getAllByIds`,
      GETALLBYFIELD: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/getAllByField`,
      PROCEDURES: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/procedures/`
    },
    COMMON_MASTER_DATA: {
      GETALL: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/get`
    },
    CATEGORY: {
      GETALL: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/category/getAll`,
      GETBYID: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/category/getById`,
      GETALLBYFIELD: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/category/getAllByField`,
      GET_BY_MODULE: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/category/getByModule`
    },
    CATEGORY_VALUES: {
      GETALL: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/categoryValue/getAll`,
      GETBYID: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/categoryValue/getById`,
      GETALLBYFIELD: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/categoryValue/category/getAllByField`,
      GET_BY_CATEGORY: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/categoryValue/getByCategory`
    },
    MODULE_TYPES: {
      GETALL: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/module/getAll`,
      GETBYID: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/module/getById`,
      GETALLBYFIELD: `${ MASTER_DATA_SERVICE_API_URL }/amd-masterdata/common/module/getAllByField`
    },
    RULES: {
      GET_REGISTERED_ENDPOINT_BY_ID: `${ RULES_SERVICE_API_URL }/amd-rules/service-registry/getEndpointById`,
      GET_REGISTERED_ENDPOINTS_BY_SERVICE: `${ RULES_SERVICE_API_URL }/amd-rules/service-registry/getEndpointsByService`,
      SAVE_ENDPOINT: `${ RULES_SERVICE_API_URL }/amd-rules/service-registry/save`,
      GET_FORM_RULES_BY_MODULE_KEY_AND_SCREEN_NAME: `${ RULES_SERVICE_API_URL }/amd-rules/form-rules/getByModuleKeyAndScreenKey`,
      UPDATE_FORM_RULES: `${ RULES_SERVICE_API_URL }/amd-rules/form-rules/edit`,
      GET_ALL_MODULES: `${ RULES_SERVICE_API_URL }/amd-rules/form-rules/getAllModules`,
      GET_ALL_SCREENS_BY_MODULE_ID: `${ RULES_SERVICE_API_URL }/amd-rules/form-rules/getAllScreensByModuleId`
    }
  },
  AUTH: {
    AUTH_SERVER: `${AUTH_SERVICE_API_URL}`,
    TENANT_CONFIG_URL: 'https://umm.dev.cloudsolutions.lk/auth',
    PERMISSION_URL: `${API_GATEWAY}`,
    SECURITY_BASE_URL: `${API_GATEWAY}`
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
