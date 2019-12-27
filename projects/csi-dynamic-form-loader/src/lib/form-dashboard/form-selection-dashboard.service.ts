import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {HttpClient} from '@angular/common/http';
import { LogUserService } from '@csi/csi-services-gateway';


@Injectable({
  providedIn: 'root'
})
export class FormSelectionDashboardService {
  public SERVER;
  public APPLICATION;

  constructor(
    @Inject('CSI_DYNAMIC_FORM_LOADER_CONFIG') private loaderConfig, 
    private http: HttpClient,
    private logUserService:LogUserService) {

    this.SERVER = loaderConfig.SERVER;
    this.APPLICATION = loaderConfig.APPLICATION;
  }

  getFormData(searchTerm): Observable<any> {
    const configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
      applicationId: this.APPLICATION
    };
    configuration['searchTerm'] = searchTerm;

    return new Observable(obs => {

      this.getFormList(configuration).subscribe(temObj => {

        obs.next(temObj);
        obs.complete();

      }, error => {
        obs.error(error);
        obs.complete();
      });
    });
  }

  /**
   * Get Master Forms List
   * @param configuration
   */
  getFormList(configuration: any) {
    const url = `${this.SERVER}/csi-personalization-service/personalisation/custom-form/list`;
    return this.http.post<any>(url, configuration);
  }
}
