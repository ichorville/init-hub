import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { environment } from "../../../../environments/environment";
import { API_URL } from "../../../rule-engine/expression-builder/services/API_URL.const";
import { API_GATEWAY } from '../../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class FieldGeneratorService {
	private fieldEditor = new Subject<any>();
	private addNotifier = new Subject<any>();

	constructor(
		private http: HttpClient,
	) { }

	getFieldList(configuration): Observable<any> {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-field/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((fieldList: any) => { }),
			catchError(this.handleError<any>('fieldList')));
	}

	postField(form: any): Observable<any> {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-field/publish`;
		return this.http.post<any>(url, form, httpOptions).pipe(tap((newHero: any) => { }),
			catchError(this.handleError<any>('addHero')));
	}

	deleteField(id: string): Observable<any> {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-field/${id}`;
		return this.http.delete<any>(url, httpOptions).pipe(tap((field: any) => { }),
			catchError(this.handleError<any>('field')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	getFieldOptions(endpoint) {
		let url = `${API_GATEWAY.SERVER}/${endpoint}`;
		return this.http.get(url).map(res => res["body"]);
	}

	public getEndPointDefinitions(service) {
		return this.http.get(service);
	}

	public getAll() {
		const requestUrl = environment.API_URL.MODULE_TYPES.GETALL;
		return this.http.get(requestUrl);
	}

	getByCategory(id: number) {
		return this.http.get(API_URL.CATEGORY_VALUES.GET_BY_CATEGORY + '/' + id);
	}

	public getResourceByType(type) {
		const url = API_URL.MASTER_DATA.GETALL + "?type=" + type + "&lang=en";
		return this.http.get(url).map(res => res['body']);
	}

	public getAllProblemList() {
		const url = `${API_GATEWAY.SERVER}/csi-net-ehr-opd-master/api/ProblemMaster/ProblemMaster`;
		return this.http.get(url);
	}

	public getResourceAllProcedures() {
		const url = API_URL.MASTER_DATA.PROCEDURES;
		return this.http.get(url);
	}

	private log(message: string) {
		console.log(message);
	}

	editSetter(res: any) {
		return this.fieldEditor.next(res);
	}

	editGetter(): Observable<any> {
		return this.fieldEditor.asObservable();
	}

	addNotifySetter(res: any) {
		return this.addNotifier.next(res);
	}

	addNotifyGetter(): Observable<any> {
		return this.addNotifier.asObservable();
	}
}
