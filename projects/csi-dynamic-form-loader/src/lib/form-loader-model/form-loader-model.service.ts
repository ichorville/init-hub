import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceLocator } from "../service.locator";
import { CsiDynamicFormLoaderService } from '../csi-dynamic-form-loader.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FormLoaderModelService {
	private SERVER;
	constructor(private http: HttpClient) {
		let loaderService: CsiDynamicFormLoaderService = ServiceLocator.injector.get(CsiDynamicFormLoaderService);
		this.SERVER = loaderService.SERVER;
	}

	public getFormById(id: string, contextData?: any): Observable<any> {
    const URL = `${this.SERVER}/csi-personalization-service/personalisation/custom-form/findById/${id}`;
    return this.http.get(URL);
  }
}
