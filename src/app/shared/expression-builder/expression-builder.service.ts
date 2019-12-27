import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { RuleSet } from 'angular2-query-builder';
import { API_GATEWAY } from 'src/environments/environment';
// import { RuleModuleScreenModel } from "./models/rule-module-screen.model";
// import { RulesDTD } from "./services/dtd/expression-builder.dtd";
// import { API_URL } from "./services/API_URL.const";
// import { CsiHttpService } from "./csi-web-base/csi-http-handler/csi-http.service";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
	providedIn: 'root'
})
export class CSIExpressionBuilderService {
	components: any[];
	duplicateComponents: any[];
	rules: any[];
	_rawData: any[];

	fieldExpressions: any[] = []
	masterFormData: any[] = [];

	fieldSetter = new Subject<any>();
	expressionBuilderExitter = new Subject<any>();
	expressionClearer = new Subject<any>();

	eventTypes: any[] = [
		{ key: 'ONE', value: 'Number' },
		{ key: 'TWO', value: 'Text' },
		{ key: 'THREE', value: 'Other Field' },
		{ key: 'FOUR', value: 'API' },
		{ key: 'FIVE', value: 'Master Data' }
	];
	actionTypes: any[] = [
		{ key: 0, value: 'Show', icon: 'visibility' },
		{ key: 1, value: 'Hide', icon: 'visibility_off' },
		{ key: 2, value: 'Alert', icon: 'message' },
		{ key: 3, value: 'Validation', icon: 'functions' },
		{ key: 4, value: 'Show Form', icon: 'camera_rear' }
	];

	constructor(
		private http: HttpClient
	) { }

	// getRulesByModuleScreen(moduleKey: string, screenKey: string): Observable<RuleModuleScreenModel> {
	// 	return new Observable((observer) => {
	// 		this.http.getAll<RulesDTD>(`${API_URL.RULES.GET_FORM_RULES_BY_MODULE_KEY_AND_SCREEN_NAME}/${moduleKey}/${screenKey}`)
	// 			.subscribe(
	// 				(data: RulesDTD) => {
	// 					const module = RuleModuleScreenModel.createInstance(data);

	// 					observer.next(module);
	// 					observer.complete();
	// 				},
	// 				(error) => {
	// 					observer.error(this._handleErrorMessage(error));
	// 					observer.complete();
	// 				}
	// 			);
	// 	});
	// }

	getModules(): Observable<string[]> {
		return new Observable((observer) => {
			// this.http.get<string[]>(`${API_URL.RULES.GET_ALL_MODULES}`)
			// 	.subscribe((data: string[]) => {
			// 		if (data) {
			// 			observer.next(data);
			// 		} else {
			// 			observer.next([]);
			// 		}
			// 		observer.complete();
			// 	},
			// 		(error) => {
			// 			observer.error(this._handleErrorMessage(error));
			// 			observer.complete();
			// 		}
			// 	);
		});
	}

	getScreensByModule(moduleKey: string): Observable<string[]> {
		return new Observable((observer) => {
			// this.http.get<string[]>(`${API_URL.RULES.GET_ALL_SCREENS_BY_MODULE_ID}/${moduleKey}`)
			// 	.subscribe((data: string[]) => {
			// 		if (data) {
			// 			observer.next(data);
			// 		} else {
			// 			observer.next([]);
			// 		}
			// 		observer.complete();
			// 	},
			// 		(error) => {
			// 			observer.error(this._handleErrorMessage(error));
			// 			observer.complete();
			// 		}
			// 	);
		});
	}

	// updateRules(ruleModel: RuleModuleScreenModel): Observable<any> {
	// 	const reqBody: RulesDTD = ruleModel.toRawData();
	// 	return new Observable((observer) => {
	// 		this.http.put(API_URL.RULES.UPDATE_FORM_RULES, reqBody)
	// 			.subscribe((res) => {

	// 				observer.next(true);
	// 				observer.complete();
	// 			},
	// 				(error) => {
	// 					observer.error(this._handleErrorMessage(error));
	// 					observer.complete();
	// 				}
	// 			)
	// 	});
	// }

	getFormList(configuration: any) {
		let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/find`;
		return this.http.post<any>(url, configuration, httpOptions).pipe(tap((formList: any) => {}),
		catchError(this.handleError<any>('forList')));
	}

	private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
	}

	updateExpression(element, exp) {
		try {
			const genaratedString = this.genarateQueryString({
				data: exp.query,
				fields: '',
				genaratedQuery: ''
			},element);
			let expression = '{' + (genaratedString.genaratedQuery.replace(/ /gi, '')) + '}';
			return expression;
		} catch (e) {
			console.log(e);
		}
	}

	private getConditionClause(condition: string): string {
		switch (condition) {
			case 'or':
				return '||';

			case 'and':
				return '&&';
		}
		return '';
	}

	private instanceOfRuleSet(object: any): object is RuleSet {
		return 'condition' in object;
	}

	private getOperator(op: string): string {
		switch (op) {
			case '=':
				return '==';
		}

		return op;
	}

  private extractValue(rule) {
    const component = this.components.find(comp => comp.componentKey === rule.field);
    let finalvalue = null;
    if (rule.value) {
      const aData = ('' + rule.value).split('|');
      const type = aData[0];

      // if (type === EXP_INPUT_TYPE_ENUM.FIELD) {
      if (type === 'field') {
        finalvalue = `[${aData[aData.length - 1]}]`;
      } else {
        finalvalue = aData[aData.length - 1];
        if (component.componentType === 'date') {
          finalvalue = new Date(aData[aData.length - 1]).getTime();
        }
      }
    }

    return finalvalue;
  }

  private genarateQueryString(object: any, element?: any) {
		const parentCondition: string = this.getConditionClause(object.data.condition);
		object.genaratedQuery += '(';
		object.data.rules.forEach((rule, index) => {
			if (!this.instanceOfRuleSet(rule)) {
				if (object.fields.search(new RegExp('\\b(' + rule.field + ')\\b', 'gi')) === -1) {
					if (object.fields) {
						object.fields += ',';
					}
					object.fields += rule.field;
				}
				if (index !== 0) {
					object.genaratedQuery += (' ' + parentCondition + ' ');
				}
				object.genaratedQuery += '( ' + ((rule.field) + (' ')
					+ (this.getOperator(rule.operator)) + (' ')
						+ (this.extractValue(rule))) + ' )';
			} else {
				if (index !== 0) {
					object.genaratedQuery += (' ' + parentCondition + ' ');
				}
				// object = this.genarateQueryString(new QueryGenarateModel(rule, object.genaratedQuery, object.fields));
				object = this.genarateQueryString({});
			}
		});
		object.genaratedQuery += (')');
		return object;
	}

	fieldRuleSetter(response: any) { this.fieldSetter.next(response) }
	fieldRuleGetter(): Observable<any> { return this.fieldSetter.asObservable() }

	expressioBuilderExitSetter(response: any) { this.expressionBuilderExitter.next(response) }
	expressioBuilderExitGetter(): Observable<any> { return this.expressionBuilderExitter.asObservable() }

	expressionClearSetter(response: any) { this.expressionClearer.next(response) }
	expressionClearGetter(): Observable<any> { return this.expressionClearer.asObservable() }
}
