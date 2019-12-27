import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { API_GATEWAY } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScreenGeneratorService {
	public screenList: any[] = [];
	private formSelectNotifier = new Subject<any>();
	private gridSelectNotifier = new Subject<any>();
 
  constructor(
		private http: HttpClient,
	) { 
    this.screenList = [
    	// { 
			// 	"gridName":"Active Ingredients",
			// 	"selectedFiels":[ 
			// 		"Active Ingredient",
			// 		"Strength",
			// 		"Strength Unit"
			// 	],
			// 	"editable":true,
			// 	"deletable":true
			// }
    ];
	}
	
	// get all fields
	getFieldList(configuration): Observable<any> {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-field/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((fieldList: any) => {}), 
		catchError(this.handleError<any>('fieldList')));
	}

	// get all fields
	getFormList(configuration: any): Observable<any> {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-form/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((formList: any) => {}), 
		catchError(this.handleError<any>('forList')));
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

	formSelectNotifierSetter(response: any) {
		this.formSelectNotifier.next(response);
	}

	formSelectNotifierGetter(): Observable<any> {
		return this.formSelectNotifier.asObservable();
	}
	
	gridSelectNotifierSetter(response: any) {
		this.gridSelectNotifier.next(response);
	}

	gridSelectNotifierGetter(): Observable<any> {
		return this.gridSelectNotifier.asObservable();
	}
}
