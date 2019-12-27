import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule  } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from '../app-routing.module';

import { LayoutComponent } from './layout.component';
import { CsiSecurityAppmenuModule } from '@csi/csi-security-appmenu';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CsiSecurityAppmenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    // AppRoutingModule,
    LayoutComponent
  ]
})
export class LayoutModule { }
