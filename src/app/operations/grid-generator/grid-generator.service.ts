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
export class GridGeneratorService {
	public gridList: any[] = [];
	private gridEditNotifier = new Subject<any>();
 
  constructor(
		private http: HttpClient,
	) { 
    this.gridList = [
    	{ 
				"gridName":"Active Ingredients",
				"selectedFiels":[ 
					"Active Ingredient",
					"Strength",
					"Strength Unit"
				],
				"editable":true,
				"deletable":true
			}
    ];
	}
	
	// get all fields
	getFieldList(configuration): Observable<any> {
		let url = `${ API_GATEWAY.SERVER }/csi-personalization-service/personalisation/custom-field/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((fieldList: any) => {}), 
		catchError(this.handleError<any>('fieldList')));
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
	
	gridEditNotifierSetter(response: any) {
		this.gridEditNotifier.next(response);
	}

	gridEditNotifierGetter(): Observable<any> {
		return this.gridEditNotifier.asObservable();
	}
}
