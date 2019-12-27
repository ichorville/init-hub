import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { API_GATEWAY } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class FormListMasterService {
	constructor(
		private http: HttpClient
	) { }

	getFormList(configuration: any): Observable<any> {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/list`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((formList: any) => { }),
			catchError(this.handleError<any>('forList')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	removeForm(id: any) {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/${id}`;
		return this.http.delete<any>(url).pipe(tap((form: any) => {
			catchError(this.handleError<any>('form'))}));
	}

	private log(message: string) {
		console.log(message);
	}
}