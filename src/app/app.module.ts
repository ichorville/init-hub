import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { CsiAgGridModule } from '@csi/csi-ag-grid';
import { CsiToastsModule, CsiToastsService } from '@csi/csi-toastr';

import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from "ngx-bootstrap";
import { CsiServicesGatewayModule } from '@csi/csi-services-gateway';
// import { CsiBaseLibraryModule } from '@csi/csi-base-library';
import { CsiDynamicFormModule } from '@csi/csi-dynamic-form';

import {CsiAuthModule, CsiIamAuthService} from '@csi/csi-auth-v2';
import {API_GATEWAY, environment} from '../environments/environment';
import {CsiSecurityAppmenuModule} from '@csi/csi-security-appmenu';
import {CsiSecurityAppmenuService} from '@csi/csi-security-appmenu';

// export const AuthConfig = {
//   LOGIN_URL: '',
//   AUTH_SERVER: 'https://vida.dev.cloudsolutions.lk/iam/auth/realms/csi'
// };

const CustomConfig = {
  APP_NAME: 'RPT',
  PERMISSION_URL: API_GATEWAY.SERVER,
  SECURITY_BASE_URL: API_GATEWAY.SERVER,
  MODULE_KEY: "admin-ui"
}
export const CsiAuthModuleForRoot = CsiAuthModule.forRoot({
  // LOGIN_URL: environment.AUTH.LOGIN_URL,
 // AUTH_SERVER: environment.AUTH.AUTH_SERVER,
  // ENABLE_TOKEN_BEARER_HEADER: true
  TENANT_CONFIG: {
    multiTenant: false,
    realmName: "csi",
    url: environment.AUTH.TENANT_CONFIG_URL,
    clientId: "app",
    isLocal: environment.envName === "local"?true:false,
  },
  LOGIN_URL: '',
  AUTH_SERVER: `${API_GATEWAY.SERVER}/iam/auth/realms/csi`
});
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    DashboardModule,
    AgGridModule.withComponents([]),
    CsiDynamicFormModule.forRoot({
      SERVER: API_GATEWAY.SERVER
    }),
    CsiSecurityAppmenuModule.forRoot(CustomConfig),
    CsiServicesGatewayModule.forRoot(API_GATEWAY.SERVER),
    CsiAuthModuleForRoot,
    // CsiBaseLibraryModule.forRoot({
    //   APP_NAME: 'CUSTOM_FORMS',
    //   PERSONALIZATION_API_ENDPOINT: 'http://172.15.100.169:8095/',
    //   AUTH_SERVER: "/proxy/service-base-security-token",
    //   PERMISSION_URL: '/proxy/service-base-user/user/security',
    //   ROLES_API_ENDPOINT: '/proxy/service-base-role-permission/role/roles',
    //   CSI_RULE: 'http://172.15.100.142:10004/amd-rules/form-rules/getByModuleKeyAndScreenKey/setup:local/procedures-screen'
    // }),
    CsiToastsModule,
    CsiAgGridModule,
    ModalModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CsiToastsService,
    CsiIamAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: csiIamConfigServiceFunc,
      multi: true,
      deps: [CsiIamAuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function csiIamConfigServiceFunc(csiIamAuthService: CsiIamAuthService) {
  return () => {
    return new Promise((resolve, reject) => {
      return csiIamAuthService.initializer().then(resp => {
        return resolve(true);
      });
    });
  };
}
