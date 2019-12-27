import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { API_GATEWAY } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class TestService {

	constructor(
		private http: HttpClient,
	) { }

	getFieldList(configuration): Observable<any> {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-field/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((fieldList: any) => {}), 
		catchError(this.handleError<any>('fieldList')));
	}

	getFormList(configuration: any) {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-form/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((formList: any) => {}), 
		catchError(this.handleError<any>('forList')));
	}

	getFormById(id: any) {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-form/find/${ id }`;
		return this.http.get<any>(url).pipe(tap((form: any) => {}), 
		catchError(this.handleError<any>('form')));
	}

  postForm(form: any): Observable<any>{
    let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-form/publish`;
    return this.http.post<any>(url, form, httpOptions).pipe(tap((newForm: any) => {}),
      catchError(this.handleError<any>('newForm')));
  }

  postRule(form: any): Observable<any>{
    let url = `${ API_GATEWAY.SERVER }/csi-pms-rms-rules/amd-rules/form-rules/create`;
    return this.http.post<any>(url, form, httpOptions).pipe(tap((newRuleSet: any) => {}),
      catchError(this.handleError<any>('newRuleSet')));
  }

	private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${ operation } failed: ${ error.message }`);
      return of(result as T);
    };
	}
	
	private log(message: string) {
    console.log(message);
  }
}
