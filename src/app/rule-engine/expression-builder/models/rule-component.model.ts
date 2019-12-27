import { RuleComponentDTD, RulesDTD } from '../services/dtd/expression-builder.dtd';
import { ComponentEventExpressionModel } from './component-event-expression.model';
import { RuleModuleScreenModel } from './rule-module-screen.model';
import { IRawData } from './interfaces/raw-data.interface';
import { COMPONENT_TYPE_ENUM } from './component-type.enum';

export class RuleComponentModel implements IRawData<RuleComponentDTD> {
	private _rawData: RuleComponentDTD = null;
	private _parent: RuleModuleScreenModel = null;
	
	rules: ComponentEventExpressionModel[] = [];
	eventNames: { key: string; name: string; }[] = [];

	private constructor(rawData: RuleComponentDTD, parent: RuleModuleScreenModel) {
		this._rawData = rawData;
		this._parent = parent;

		if (this._rawData) {
			if (this._rawData.rules) {
				for (let i = 0; i < this._rawData.rules.length; i++) {
					const rawEventInfo = this._rawData.rules[i];
					const eventInfo = ComponentEventExpressionModel.createInstance(rawEventInfo.event, rawEventInfo, this);

					this.eventNames.push({
						key: rawEventInfo.event,
						name: rawEventInfo.event
					});

					this.rules.push(eventInfo);
				}
			} else {
				this._rawData.rules = [];
			}
		}
	}

	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get componentKey(): string {
		if (this._rawData) {
			return this._rawData.componentKey;
		}
		return '';
	}
	set componentKey(val: string) {
		if (this._rawData) {
			this._rawData.componentKey = val;
		}
	}

	get componentName(): string {
		if (this._rawData) {
			return this._rawData.componentName;
		}
		return '';
	}
	set componentName(val: string) {
		if (this._rawData) {
			this._rawData.componentName = val;
		}
	}

	get componentType(): COMPONENT_TYPE_ENUM {
		if (this._rawData) {
			return this._rawData.componentType;
		}
		return null;
	}
	set componentType(val: COMPONENT_TYPE_ENUM) {
		if (this._rawData) {
			this._rawData.componentType = val;
		}
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	static createInstance(rawData: RuleComponentDTD, parent: RuleModuleScreenModel): RuleComponentModel {
		const instance = new RuleComponentModel(rawData, parent);
		return instance;
	}

	getEventExpressionModel(eventKey): ComponentEventExpressionModel {
		if (eventKey) {
			for (let i = 0; i < this.rules.length; i++) {
				const oRule = this.rules[i];

				if (oRule.eventKey === eventKey) {
					return oRule;
				}
			}
		}

		return null;
	}

	addEventExpression(eventKey: string) {
		const oEventExp = this.getEventExpressionModel(eventKey);
		if (oEventExp !== null) {
			console.log('Event already exists.');
			return;
		}

		const eventInfo = ComponentEventExpressionModel.createNew(eventKey, this);
		console.log(eventInfo)
		this.eventNames.push({
			key: eventKey,
			name: eventKey
		});

		this.rules.push(eventInfo);
		this._rawData.rules.push(eventInfo.toRawData());
		console.log(this.rules)
		console.log(this._rawData)
	}

	getParent(): RuleModuleScreenModel {
		return this._parent;
	}

	toParentRawData(): RulesDTD {
		return this._parent.toRawData();
	}

	toRawData(): RuleComponentDTD {
		return this._rawData;
	}
}
