import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LogUserService } from '@csi/csi-services-gateway';
import { CsiSecurityAppmenuService } from '@csi/csi-security-appmenu';


@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private logUserService: LogUserService,
    private csiSecurityAppmenuService: CsiSecurityAppmenuService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(obs => {
      console.log('Permission guard excuted');

      this.logUserService.setUser('admin-ui').subscribe(status => {
        this.logUserService.setDefaultApplication('admin-ui');
        this.csiSecurityAppmenuService.onChangeLocation.subscribe(hospitalId => {
          let hosp = {
            hospitalId: hospitalId,
            hospitalGroupId: this.logUserService.getUserHospitalGroupId()
          }
          this.logUserService.setHospitalData(hosp);
          console.log(this.logUserService.getUserHospitalGroupId());
          console.log(this.logUserService.getUserHospitalId());
        })
        obs.next(status);
        obs.complete();
      }, error => {
        console.log(error);
        obs.next(false);
        obs.complete();
      })

    })
  }
}
