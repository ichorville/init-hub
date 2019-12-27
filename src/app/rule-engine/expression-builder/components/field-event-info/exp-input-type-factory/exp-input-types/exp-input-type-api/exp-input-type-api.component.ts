
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ExpInputTypeBaseComponent } from '../exp-input-type-base/exp-input-type-base.component';
import * as _ from 'lodash';
import {EXP_INPUT_TYPE_ENUM} from "../../../../../models/exp-input-types/exp-input-type.enum";
import {convertToInt} from "../../../../../rules-module/convert-to-number";
import {EndpointInfoDTD} from "../../../../../rules-module/services/dtd/rules.dtd";
import {RulesService} from "../../../../../rules-module/services/rules.service";
import {MasterDataCommonDataDTD} from "../../../../../masterdata-module/services/dtd/master-data.dtd";
import {MasterDataService} from "../../../../../masterdata-module/services/master-data.service";
import {CsiHttpService} from "../../../../../csi-web-base/csi-http-handler/csi-http.service";


interface ParamObjDTD {
	key: string;
	name: string;
	value: string;
}

@Component({
	selector: 'app-exp-input-type-api',
	templateUrl: './exp-input-type-api.component.html',
	styleUrls: ['./exp-input-type-api.component.css']
})
export class ExpInputTypeAPIComponent extends ExpInputTypeBaseComponent<string> implements OnInit {

	services: MasterDataCommonDataDTD[] = [];
	endpoints: EndpointInfoDTD[] = [];

	selectedServiceId = '-1';
	selectedEndpointId = '-1';

	selectedService: MasterDataCommonDataDTD = null;
	selectedEndpoint: EndpointInfoDTD = null;

	parameters: ParamObjDTD[] = [];


	singleValue: any = null;
	values: any[] = null;


	constructor(
		private masterDataService: MasterDataService,
		private rulesService: RulesService,
		private csiHttpService: CsiHttpService
	) {
		super();
	}

	/**
	 * @implements
	 */
	ngOnInit() {
		this.loadDropBox_Services();
	}



	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get hasValue(): boolean {
		if (this.singleValue !== null || this.values !== null) {
			return true;
		}

		return false;
	}

	get isSingleValueBased(): boolean {
		if (this.singleValue !== null) {
			return true;
		}

		return false;
	}

	get isEndpointSelected(): boolean {
		if (this.selectedEndpoint !== null) {
			return true;
		}

		return false;
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	/**
	 * FORMAT: Type|ServiceId|EndpointId|Params|Value
	 *
	 * Params FORMAT: param1=val1&param2=val2&param3=val3
	 *
	 * @override
	 */
	getValue(): string {
		let params = '';

		if (this.parameters && this.parameters.length) {
			for (let i = 0; i < this.parameters.length; i++) {
				const param = this.parameters[i];

				params += (`${param.key}=${param.value}`);

				if (i + 1 !== this.parameters.length) {
					params += '&';
				}
			}
		}

		return `${EXP_INPUT_TYPE_ENUM.API}|${this.selectedServiceId}|${this.selectedEndpointId}|${params}|${this.inputValue}`;
	}

	/**
	 * @override
	 */
	async setValue(val: string) {
		console.log('ExpInputTypeAPIComponent::setValue : ', val);

		if (val) {
			const aData = ('' + val).split('|');
			if (aData.length) {
				const type = aData[0];

				if (type === EXP_INPUT_TYPE_ENUM.API && aData.length === 5) {
					const serviceId = aData[1];
					const endpointId = aData[2];
					const params = aData[3];
					const value = aData[4];

					await this.loadDropBox_Services();
					this.selectedServiceId = serviceId;
					this.updateSelectedService();

					await this.loadDropBox_Endpoints(serviceId);
					this.selectedEndpointId = endpointId;
					this.updateSelectedEndpoint();
					this.generateParameters();

					if (params) {
						const aParams = params.split('&');

						for (let i = 0; i < this.parameters.length; i++) {
							const oParam = this.parameters[i];

							for (let j = 0; j < aParams.length; j++) {
								const sParam = aParams[j];
								const aParamData = sParam.split('=');

								if (aParamData.length === 2) {
									const paramKey = aParamData[0];
									const paramValue = aParamData[1];

									if (oParam.key === paramKey) {
										oParam.value = paramValue;
										break;
									}
								}
							}
						}
					}


					await this.invokeService();
					this.inputValueSilent = value;
				}
			}
		}
	}

	alert(message) {
		alert(message);
		// this._csiAlertService.success('Message', message, 'OK', 'btn');
	}

	getValueKey(value: any): any {
		if (value && this.selectedEndpoint) {
			return value[this.selectedEndpoint.key];
		}

		return null;
	}

	getValueDescription(value: any): any {
		if (value && this.selectedEndpoint) {
			let val = value[this.selectedEndpoint.description];

			if (!val) {
				val = value['name'];
			}
			if (!val) {
				val = value['description'];
			}

			return val || '';
		}

		return '';
	}

	getLabelName(): string {
		if (this.hasValue && this.selectedEndpoint) {
			if (this.isSingleValueBased) {
				return this.getSingleValueDescription();
			} else {
				return this.wordify(this.selectedEndpoint.description);
			}
		}

		return '';
	}

	getSingleValueKey(): string {
		if (this.singleValue && this.selectedEndpoint) {
			return this.singleValue[this.selectedEndpoint.key];
		}

		return '';
	}

	getSingleValueDescription(): string {
		if (this.singleValue && this.selectedEndpoint) {
			return this.singleValue[this.selectedEndpoint.description];
		}

		return '';
	}

	getParamName(param: ParamObjDTD): string {
		if (param) {
			return this.wordify(param.name);
		}

		return '';
	}

	// getParamValue(param: ParamObjDTD): any {
	// 	if (param) {
	// 		return param.value;
	// 	}

	// 	return null;
	// }


	private wordify(val: string): string {
		if (val) {
			return _.lowerCase(val);
		}

		return '';
	}

	private loadDropBox_Services(): Promise<boolean> {
		this.services = [];
		this.selectedServiceId = '-1';
		this.selectedService = null;

		return new Promise<boolean>((resolve, reject) => {
			this.masterDataService.getRulesServiceRegistry()
				.subscribe((list) => {
					this.services = list;

					resolve(true);
				});
		});
	}

	private loadDropBox_Endpoints(serviceId): Promise<boolean> {
		this.endpoints = [];
		this.selectedEndpointId = '-1';
		this.selectedEndpoint = null;

		return new Promise<boolean>((resolve, reject) => {
			if (this.selectedServiceId === '-1') {
				resolve(true);
				return;
			}

			this.rulesService.getRegisteredEndpointsList(this.selectedServiceId)
				.subscribe((list) => {
					this.endpoints = list;

					resolve(true);
				});
		});
	}

	private findServiceById(id: number): MasterDataCommonDataDTD {
		for (let i = 0; i < this.services.length; i++) {
			const service = this.services[i];
			if (service.id === id) {
				return service;
			}
		}

		return null;
	}

	private findEndpointById(id: number): EndpointInfoDTD {
		for (let i = 0; i < this.endpoints.length; i++) {
			const endpoint = this.endpoints[i];
			if (endpoint.id === id) {
				return endpoint;
			}
		}

		return null;
	}

	private generateParameters() {
		this.clearParameters();

		if (this.selectedEndpoint !== null) {

			// TODO: TEMP: Get from `this.selectedEndpoint.parameters`
			const params = ('' + this.selectedEndpoint.endpoint).match(/{/gi);
			let tempUrl = this.selectedEndpoint.endpoint || '';
			if (params) {
				for (let i = 0; i < params.length; i++) {
					const param = params[i];

					const sIndx = tempUrl.search('{');
					const eIndx = tempUrl.search('}');
					const paramKey = tempUrl.substring(sIndx + 1, eIndx);
					tempUrl = tempUrl.replace(`{${paramKey}}`, 'dummy');

					this.parameters.push({
						key: paramKey,
						name: paramKey,
						value: ''
					});
				}
			}
		}
	}

	private clearValue() {
		this.inputValue = null;
		this.singleValue = null;
		this.values = null;
	}
	private clearParameters() {
		this.parameters = [];
	}

	private updateSelectedService() {
		if (this.selectedServiceId !== '-1') {
			this.selectedService = this.findServiceById(convertToInt(this.selectedServiceId));
		} else {
			this.selectedService = null;
		}
	}

	private updateSelectedEndpoint() {
		if (this.selectedEndpointId !== '-1') {
			this.selectedEndpoint = this.findEndpointById(convertToInt(this.selectedEndpointId));
		} else {
			this.selectedEndpoint = null;
		}

		this.generateParameters();
	}

	private invokeService(): Promise<boolean> {
		this.clearValue();

		return new Promise<boolean>((resolve, reject) => {
			if (this.selectedEndpoint !== null) {
				let endpointUrl = this.selectedEndpoint.endpoint;

				if (this.parameters.length) {
					for (let i = 0; i < this.parameters.length; i++) {
						const param = this.parameters[i];

						endpointUrl = endpointUrl.replace(`{${param.key}}`, (param.value || 'null'));
					}
				}

				this.csiHttpService.getAll(endpointUrl)
					.subscribe(
						(value) => {
							if (value && Array.isArray(value)) {
								this.values = value;
							} else {
								this.singleValue = value || null;
								if (this.singleValue) {
									this.inputValue = this.getSingleValueKey();
								}
							}

							resolve(true);
						},
						(error) => {
							console.log(error);
							this.alert('Failed to retrieve data from service.');

							resolve(false);
						}
					);
			} else {
				resolve(true);
			}
		});
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onChangeService(event) {
		this.clearValue();
		this.clearParameters();

		this.updateSelectedService();

		this.loadDropBox_Endpoints(this.selectedServiceId);
	}

	onChangeEndpoint(event) {
		this.clearValue();

		this.updateSelectedEndpoint();
	}

	onClick_GetValue(event) {
		this.invokeService();
	}

}
