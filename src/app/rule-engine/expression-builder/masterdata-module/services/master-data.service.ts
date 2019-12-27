import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MasterDataCommonDataDTD } from './dtd/master-data.dtd';
import {environment} from "../../../../../environments/environment";
import {CsiHttpService} from "../../csi-web-base/csi-http-handler/csi-http.service";
import {SharedService} from "../../services/shared.service";

@Injectable()
export class MasterDataService {

	lang;

	private getCommonMasterDataUrl = environment.API_URL.COMMON_MASTER_DATA.GETALL;
	private getMasterDataUrl = environment.API_URL.MASTER_DATA.GETALL;
	private getMasterDataByIDUrl = environment.API_URL.MASTER_DATA.GETBYID;
	private getMasterDataByIDSUrl = environment.API_URL.MASTER_DATA.GETBYIDS;

	constructor(private csiHttpService: CsiHttpService,
		private httpClient: HttpClient,
		private _sharedService: SharedService) {
		this.lang = this._sharedService.getLanguage();
	}

	getMasterData(masterDataType: string, isActive?: string): Observable<any> {
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append("type", masterDataType);
		if (this.lang) {
			urlSearchParams.append("lang", this.lang);
		}
		if (isActive != null) {
			urlSearchParams.append("isActive", isActive);
		}
		return this.csiHttpService.search(this.getMasterDataUrl, urlSearchParams);
	}

	getCommonMasterData(module: string, category: string): Observable<MasterDataCommonDataDTD[]> {
		if (this.lang) {
			return this.csiHttpService.getAll(this.getCommonMasterDataUrl + '/' + module + '/' + category + '/' + this.lang);
		} else {
			return this.csiHttpService.getAll(this.getCommonMasterDataUrl + '/' + module + '/' + category);
		}
	}

	getMasterDataByID(id: number, masterDataType: string): Observable<any> {
		return this.csiHttpService.getAll(this.getMasterDataByIDUrl + '?id=' + id + '&type=' + masterDataType);
	}

	getMasterDataByIDS(object: any): Observable<any> {
		return new Observable(obs => {
			let headers = new Headers();
			headers.append('Accept', 'application/json');
			this.csiHttpService.post(this.getMasterDataByIDSUrl, object).subscribe(response => {
				obs.next(response);
				obs.complete();
			}, error => {
				obs.error(error);
				obs.complete();
			});
		});
	}

	getRulesServiceRegistry(): Observable<MasterDataCommonDataDTD[]> {
		return this.getCommonMasterData('Rules', 'ServiceRegistry');
	}

}
