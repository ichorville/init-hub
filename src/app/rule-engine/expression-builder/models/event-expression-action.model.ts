import {
	RuleComponentEventActionDTD, EVENT_ACTION_TYPE, RuleComponentEventAction_InAppDTD,
	RuleComponentEventAction_ServiceCallDTD, RuleEventActionStep_Base, EVENT_ACTION_STEP_TYPE
} from '../services/dtd/expression-builder.dtd';
import { ComponentEventExpressionModel } from './component-event-expression.model';
import { FactoryActionStepModel } from './factory-models/factory-action-step.model';

export abstract class EventExpressionActionModel {
	protected _rawData: RuleComponentEventActionDTD = null;
	private _parent: ComponentEventExpressionModel = null;

	type: EVENT_ACTION_TYPE = null;

	protected constructor(rawData: RuleComponentEventActionDTD, parent: ComponentEventExpressionModel) {
		this._rawData = rawData;
		this._parent = parent;

		if (this._rawData) {
			this.type = this._rawData.type;
		}
	}


	static factoryCreate(rawData: RuleComponentEventActionDTD, parent: ComponentEventExpressionModel): EventExpressionActionModel {
		let inst: EventExpressionActionModel = null;

		switch (rawData.type) {
			case EVENT_ACTION_TYPE.IN_APP:
				inst = new EventExpressionAction_InAppModel(<RuleComponentEventAction_InAppDTD>rawData, parent);
				break;
			case EVENT_ACTION_TYPE.SERVICE_CALL:
				inst = new EventExpressionAction_ServiceCallModel(<RuleComponentEventAction_ServiceCallDTD>rawData, parent);
				break;
		}

		return inst;
	}

	// static createInstance(rawData: RuleComponentEventActionDTD, parent: ComponentEventExpressionModel): EventExpressionActionModel {
	// 	const instance = new EventExpressionActionModel(rawData, parent);

	// 	return instance;
	// }


	get typeDesc(): string {
		switch (this.type) {
			case EVENT_ACTION_TYPE.IN_APP:
				return 'In App';

			case EVENT_ACTION_TYPE.SERVICE_CALL:
				return 'Service Call';
		}

		return '';
	}

	getParent(): ComponentEventExpressionModel {
		return this._parent;
	}

	toJson() {
		return this._rawData;
	}
}


export class EventExpressionAction_InAppModel extends EventExpressionActionModel {

	actionSteps: RuleEventActionStep_Base[] = [];

	constructor(rawData: RuleComponentEventAction_InAppDTD, parent: ComponentEventExpressionModel) {
		super(rawData, parent);

		if (!this.rawData.actionSteps) {
			this.rawData.actionSteps = [];
		}

		for (let i = 0; i < this.rawData.actionSteps.length; i++) {
			const actionStep = this.rawData.actionSteps[i];

			const newAction = FactoryActionStepModel.factoryCreate(actionStep, this);

			this.actionSteps.push(newAction);
		}
	}

	private get rawData(): RuleComponentEventAction_InAppDTD {
		return this._rawData as RuleComponentEventAction_InAppDTD;
	}


	addActionStep(actionType: EVENT_ACTION_STEP_TYPE) {
		const newAction = FactoryActionStepModel.factoryCreate({
			type: actionType as any,
			content: '',
			params: '',
			targetControl: ''
		}, this);

		this.actionSteps.push(newAction);
		this.rawData.actionSteps.push(newAction.toJson());
	}
}

export class EventExpressionAction_ServiceCallModel extends EventExpressionActionModel {
	// /**
	//  * @override
	//  */
	// protected _rawData: RuleComponentEventAction_ServiceCallDTD = null;
	// parameters: "field1,field2",
	// endPoint: "/notification/xyz"

	constructor(rawData: RuleComponentEventAction_ServiceCallDTD, parent: ComponentEventExpressionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleComponentEventAction_ServiceCallDTD {
		return this._rawData as RuleComponentEventAction_ServiceCallDTD;
	}

	get parameters(): string {
		return this.rawData.parameters;
	}
	set parameters(val: string) {
		this.rawData.parameters = val;
	}

	get endPoint(): string {
		return this.rawData.endPoint;
	}
	set endPoint(val: string) {
		this.rawData.endPoint = val;
	}
}

