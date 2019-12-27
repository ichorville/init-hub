import { RuleModuleScreenDTD } from '../services/dtd/expression-builder.dtd';
import { RuleComponentModel } from './rule-component.model';
import { IRawData } from './interfaces/raw-data.interface';
import { COMPONENT_TYPE_ENUM } from './component-type.enum';

export class RuleModuleScreenModel implements IRawData<RuleModuleScreenDTD> {
	private _rawData: RuleModuleScreenDTD = null;

	// moduleKey: string = null;
	// moduleName: string = null;
	// screenKey: string = null;
	// screenName: string = null;

	components: RuleComponentModel[] = [];

	public constructor(rawData: RuleModuleScreenDTD) {
		this._rawData = rawData;

		if (this._rawData) {
			if (this._rawData.components) {
				for (let i = 0; i < this._rawData.components.length; i++) {
					const rawComp = this._rawData.components[i];

					const comp = RuleComponentModel.createInstance(rawComp, this);
					this.components.push(comp);
				}
			} else {
				this._rawData.components = [];
			}
		}
	}

	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get moduleKey(): string {
		if (this._rawData) {
			return this._rawData.moduleKey;
		}
		return '';
	}
	set moduleKey(val: string) {
		if (this._rawData) {
			this._rawData.moduleKey = val;
		}
	}

	get moduleName(): string {
		if (this._rawData) {
			return this._rawData.moduleName;
		}
		return '';
	}
	set moduleName(val: string) {
		if (this._rawData) {
			this._rawData.moduleName = val;
		}
	}

	get screenKey(): string {
		if (this._rawData) {
			return this._rawData.screenKey;
		}
		return '';
	}
	set screenKey(val: string) {
		if (this._rawData) {
			this._rawData.screenKey = val;
		}
	}

	get screenName(): string {
		if (this._rawData) {
			return this._rawData.screenName;
		}
		return '';
	}
	set screenName(val: string) {
		if (this._rawData) {
			this._rawData.screenName = val;
		}
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	static createInstance(rawData: RuleModuleScreenDTD): RuleModuleScreenModel {
		const instance = new RuleModuleScreenModel(rawData);

		return instance;
	}


	addComponent(
		{ componentKey, componentName, componentType }: { componentKey: string; componentName: string; componentType: COMPONENT_TYPE_ENUM; }
	): RuleComponentModel {
		const comp = RuleComponentModel.createInstance({
			componentKey,
			componentName,
			componentType
		}, this);

		this.components.push(comp);

		if (this._rawData && this._rawData.components) {
			this._rawData.components.push(comp.toRawData());
		}

		return comp;
	}

	removeComponentAtIndex(index: number): void {
		const len = this.components.length;

		if (index > -1 && index < len) {
			this.components.splice(index, 1);

			if (this._rawData && this._rawData.components) {
				this._rawData.components.splice(index, 1);
			}
		}
	}


	toRawData(): RuleModuleScreenDTD {
		return this._rawData;
	}
}
