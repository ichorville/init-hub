import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { EndpointsByServiceResponseDTD } from './dtd/rules.dtd';
import {CsiHttpService} from "../../csi-web-base/csi-http-handler/csi-http.service";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class RulesService {

  private getRegisteredEndpointsByServiceURL = environment.API_URL.RULES.GET_REGISTERED_ENDPOINTS_BY_SERVICE;

	constructor(private csiHttpService: CsiHttpService) { }

  getRegisteredEndpointsList(serviceId: string): Observable<EndpointsByServiceResponseDTD> {
    return this.csiHttpService.getAll(this.getRegisteredEndpointsByServiceURL + '/' + serviceId);
  }

}
