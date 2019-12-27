
import { Component, OnInit } from '@angular/core';
import { ExpInputTypeBaseComponent } from '../exp-input-type-base/exp-input-type-base.component';
import * as _ from 'lodash';
import {SetupCategoryDTD, SetupModuleDTD} from "../../../../../setup-module/services/dtd/setup.dtd";
import {ModuleTypeService} from "../../../../../setup-module/services/ModuleTypeService";
import {CsiHttpService} from "../../../../../csi-web-base/csi-http-handler/csi-http.service";
import {MasterDataService} from "../../../../../masterdata-module/services/master-data.service";
import {convertToInt} from "../../../../../rules-module/convert-to-number";
import {MasterDataCommonDataDTD} from "../../../../../masterdata-module/services/dtd/master-data.dtd";
import {EXP_INPUT_TYPE_ENUM} from "../../../../../models/exp-input-types/exp-input-type.enum";


interface ParamObjDTD {
	key: string;
	name: string;
	value: string;
}

@Component({
	selector: 'app-exp-input-type-masterdata',
	templateUrl: './exp-input-type-masterdata.component.html',
	styleUrls: ['./exp-input-type-masterdata.component.css']
})
export class ExpInputTypeMasterDataComponent extends ExpInputTypeBaseComponent<string> implements OnInit {
	modules: SetupModuleDTD[] = [];
	categories: SetupCategoryDTD[] = [];
	values: MasterDataCommonDataDTD[] = [];

	selectedModuleId = '-1';
	selectedCategoryId = '-1';

	selectedModule: SetupModuleDTD = null;
	selectedCategory: SetupCategoryDTD = null;


	constructor(
		private moduleTypeService: ModuleTypeService,
		private masterDataService: MasterDataService,
		private csiHttpService: CsiHttpService
	) {
		super();
	}

	/**
	 * @implements
	 */
	ngOnInit() {
		this.loadDropBox_Modules();
	}



	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get hasValue(): boolean {
		if (this.inputValue !== null && this.inputValue !== '-1') {
			return true;
		}

		return false;
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	/**
	 * FORMAT: Type|ModuleId|CategoryId|Value
	 *
	 * @override
	 */
	getValue(): string {

		return `${EXP_INPUT_TYPE_ENUM.MASTER_DATA}|${this.selectedModuleId}|${this.selectedCategoryId}|${this.inputValue}`;
	}

	/**
	 * @override
	 */
	async setValue(val: string) {
		console.log('ExpInputTypeMasterDataComponent::setValue : ', val);

		if (val) {
			const aData = ('' + val).split('|');
			if (aData.length) {
				const type = aData[0];

				if (type === EXP_INPUT_TYPE_ENUM.MASTER_DATA && aData.length === 4) {
					const moduleId = aData[1];
					const categoryId = aData[2];
					const value = aData[3];

					await this.loadDropBox_Modules();
					this.selectedModuleId = moduleId;
					this.updateSelectedModule();

					await this.loadDropBox_Categories(moduleId);
					this.selectedCategoryId = categoryId;
					this.updateSelectedCategory();

					if (this.selectedModule && this.selectedCategory) {
						await this.loadDropBox_Values(this.selectedModule.name, this.selectedCategory.name);
						this.inputValueSilent = value;
					}
				}
			}
		}
	}

	alert(message) {
		alert(message);
		// this._csiAlertService.success('Message', message, 'OK', 'btn');
	}


	private loadDropBox_Modules(): Promise<boolean> {
		this.modules = [];
		this.selectedModuleId = '-1';
		this.selectedModule = null;

		return new Promise<boolean>((resolve, reject) => {
			this.moduleTypeService.getAll()
				.subscribe((list: SetupModuleDTD[]) => {
					this.modules = list;

					resolve(true);
				});
		});
	}

	private loadDropBox_Categories(moduleId): Promise<boolean> {
		this.categories = [];
		this.selectedCategoryId = '-1';
		this.selectedCategory = null;

		return new Promise<boolean>((resolve, reject) => {
			if (moduleId === '-1') {
				resolve(true);
				return;
			}

			if (this.selectedModule) {
				this.categories = this.selectedModule.categories;
				resolve(true);
			} else {
				resolve(true);
			}
		});
	}

	private loadDropBox_Values(moduleName, categoryName): Promise<boolean> {
		this.values = [];
		this.inputValue = null;

		return new Promise<boolean>((resolve, reject) => {
			if (this.selectedModuleId === '-1' || this.selectedCategoryId === '-1') {
				resolve(true);
				return;
			}

			this.masterDataService.getCommonMasterData(moduleName, categoryName)
				.subscribe((list) => {
					this.values = list;

					resolve(true);
				});
		});
	}

	private findModuleById(id: number): SetupModuleDTD {
		for (let i = 0; i < this.modules.length; i++) {
			const oModule = this.modules[i];
			if (oModule.id === id) {
				return oModule;
			}
		}

		return null;
	}

	private findCategoryById(id: number): SetupCategoryDTD {
		for (let i = 0; i < this.categories.length; i++) {
			const category = this.categories[i];
			if (category.id === id) {
				return category;
			}
		}

		return null;
	}


	private updateSelectedModule() {
		if (this.selectedModuleId !== '-1') {
			this.selectedModule = this.findModuleById(convertToInt(this.selectedModuleId));
		} else {
			this.selectedModule = null;
		}
	}

	private updateSelectedCategory() {
		if (this.selectedCategoryId !== '-1') {
			this.selectedCategory = this.findCategoryById(convertToInt(this.selectedCategoryId));
		} else {
			this.selectedCategory = null;
		}
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onChange_Module(event) {
		this.updateSelectedModule();

		this.loadDropBox_Categories(this.selectedModuleId);
	}

	onChange_Category(event) {
		this.updateSelectedCategory();

		this.loadDropBox_Values(this.selectedModule.name, this.selectedCategory.name);
	}

	onChange_Value(event) {

	}

}
