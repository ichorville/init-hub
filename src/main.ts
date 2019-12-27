import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey("Cloud_Solutions_International_pvt._ltd._MultiApp_1Devs17_May_2019__MTU1ODA0NzYwMDAwMA==9e168b56ccf36f39f4a3a5531f957e8a");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
