import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RuleModuleScreenModel} from "./models/rule-module-screen.model";
import {RulesDTD} from "./services/dtd/expression-builder.dtd";
import {API_URL} from "./services/API_URL.const";
import {CsiHttpService} from "./csi-web-base/csi-http-handler/csi-http.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
	providedIn: 'root'
})
export class ExpressionBuilderService {

	constructor(
    private csiHttpService: CsiHttpService
  ) { }

  getRulesByModuleScreen(moduleKey: string, screenKey: string): Observable<RuleModuleScreenModel> {
    return new Observable((observer) => {
      this.csiHttpService.getAll<RulesDTD>(`${API_URL.RULES.GET_FORM_RULES_BY_MODULE_KEY_AND_SCREEN_NAME}/${moduleKey}/${screenKey}`)
        .subscribe(
          (data: RulesDTD) => {
            const module = RuleModuleScreenModel.createInstance(data);

            observer.next(module);
            observer.complete();
          },
          (error) => {
            observer.error(this._handleErrorMessage(error));
            observer.complete();
          }
        );
    });
  }

  getModules(): Observable<string[]> {
    return new Observable((observer) => {
      this.csiHttpService.getAll<string[]>(`${API_URL.RULES.GET_ALL_MODULES}`)
        .subscribe((data: string[]) => {
            if (data) {
              observer.next(data);
            } else {
              observer.next([]);
            }
            observer.complete();
          },
          (error) => {
            observer.error(this._handleErrorMessage(error));
            observer.complete();
          }
        );
    });
  }

  getScreensByModule(moduleKey: string): Observable<string[]> {
    return new Observable((observer) => {
      this.csiHttpService.getAll<string[]>(`${API_URL.RULES.GET_ALL_SCREENS_BY_MODULE_ID}/${moduleKey}`)
        .subscribe((data: string[]) => {
            if (data) {
              observer.next(data);
            } else {
              observer.next([]);
            }
            observer.complete();
          },
          (error) => {
            observer.error(this._handleErrorMessage(error));
            observer.complete();
          }
        );
    });
  }

  updateRules(ruleModel: RuleModuleScreenModel): Observable<any> {
    const reqBody: RulesDTD = ruleModel.toRawData();
    return new Observable((observer) => {
      this.csiHttpService.put(API_URL.RULES.UPDATE_FORM_RULES, reqBody)
        .subscribe((res) => {

            observer.next(true);
            observer.complete();
          },
          (error) => {
            observer.error(this._handleErrorMessage(error));
            observer.complete();
          }
        )
    });
  }

  private _handleErrorMessage(error: HttpErrorResponse): string {
    let msg = 'Unknown Service Error';
    try {
      if (error.status === 0) {
        msg = `Service failed. Please check the internet connection.`;
      } else {
        msg = `${error.status}: ${error.message || error.statusText}`;
      }
    } catch (e) {
      msg = '' + error;
    }
    return msg;
  }
}
