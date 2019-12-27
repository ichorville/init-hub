import {
	RuleEventActionStepDTD, EVENT_ACTION_STEP_TYPE, RuleEventActionStep_HideDTD,
	RuleEventActionStep_ShowDTD, RuleEventActionStep_AlertDTD, RuleEventActionStep_ValidationsDTD,
	RuleEventActionStep_EnableDTD, RuleEventActionStep_DisableDTD, RuleEventActionStep_SetDTD
} from '../services/dtd/expression-builder.dtd';
import { EventExpressionActionModel } from './event-expression-action.model';
import { RuleModuleScreenModel } from './rule-module-screen.model';



export abstract class ExpressionActionStepModel {
	protected _rawData: RuleEventActionStepDTD = null;
	private _parent: EventExpressionActionModel = null;

	type: EVENT_ACTION_STEP_TYPE = null;

	protected constructor(rawData: RuleEventActionStepDTD, parent: EventExpressionActionModel) {
		this._rawData = rawData;
		this._parent = parent;

		if (this._rawData) {
			this.type = this._rawData.type;
		}
	}


	// static factoryCreate(rawData: RuleEventActionStepDTD, parent: EventExpressionActionModel): ExpressionActionStepModel {
	// 	let inst: ExpressionActionStepModel = null;

	// 	switch (rawData.type) {
	// 		case EVENT_ACTION_STEP_TYPE.HIDE:
	// 			inst = new ExpressionActionStep_HideModel(<RuleEventActionStep_HideDTD>rawData, parent);
	// 			break;

	// 		// case EVENT_ACTION_STEP_TYPE.SHOW:
	// 		// 	inst = new ExpressionActionStep_ShowModel(<RuleEventActionStep_ShowDTD>rawData, parent);
	// 		// 	break;

	// 		// case EVENT_ACTION_STEP_TYPE.ENABLE:
	// 		// 	inst = new ExpressionActionStep_EnableModel(<RuleEventActionStep_EnableDTD>rawData, parent);
	// 		// 	break;

	// 		// case EVENT_ACTION_STEP_TYPE.DISABLE:
	// 		// 	inst = new ExpressionActionStep_DisableModel(<RuleEventActionStep_DisableDTD>rawData, parent);
	// 		// 	break;

	// 		// case EVENT_ACTION_STEP_TYPE.ALERT:
	// 		// 	inst = new ExpressionActionStep_AlertModel(<RuleEventActionStep_AlertDTD>rawData, parent);
	// 		// 	break;

	// 		// case EVENT_ACTION_STEP_TYPE.SET:
	// 		// 	inst = new ExpressionActionStep_SetModel(<RuleEventActionStep_SetDTD>rawData, parent);
	// 		// 	break;

	// 		// case EVENT_ACTION_STEP_TYPE.VALIDATIONS:
	// 		// 	inst = new ExpressionActionStep_ValidationModel(<RuleEventActionStep_ValidationsDTD>rawData, parent);
	// 		// 	break;
	// 	}

	// 	return inst;
	// }

	// static createInstance(rawData: RuleComponentEventActionDTD, parent: ComponentEventExpressionModel): EventExpressionActionModel {
	// 	const instance = new EventExpressionActionModel(rawData, parent);
	// 	return instance;
	// }


	get typeDesc(): string {
		switch (this.type) {
			case EVENT_ACTION_STEP_TYPE.SHOW:
				return 'Show';

			case EVENT_ACTION_STEP_TYPE.HIDE:
				return 'Hide';

			case EVENT_ACTION_STEP_TYPE.ENABLE:
				return 'Enable';

			case EVENT_ACTION_STEP_TYPE.DISABLE:
				return 'Disable';

			case EVENT_ACTION_STEP_TYPE.ALERT:
				return 'Alert';

			case EVENT_ACTION_STEP_TYPE.SHOW:
				return 'Set';

			case EVENT_ACTION_STEP_TYPE.VALIDATIONS:
				return 'Validation';
		}

		return '';
	}

	getRootParent(): RuleModuleScreenModel {
		if (this._parent && this._parent.getParent() && this._parent.getParent().getRootParent()) {
			return this._parent.getParent().getRootParent();
		}

		return null;
	}

	toJson() {
		return this._rawData;
	}
}







// export class ExpressionActionStep_HideModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_HideDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_HideDTD {
// 		return this._rawData as RuleEventActionStep_HideDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }

// export class ExpressionActionStep_ShowModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_ShowDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_ShowDTD {
// 		return this._rawData as RuleEventActionStep_ShowDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }

// export class ExpressionActionStep_EnableModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_EnableDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_EnableDTD {
// 		return this._rawData as RuleEventActionStep_EnableDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }

// export class ExpressionActionStep_DisableModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_DisableDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_DisableDTD {
// 		return this._rawData as RuleEventActionStep_DisableDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }

// export class ExpressionActionStep_AlertModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_AlertDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_AlertDTD {
// 		return this._rawData as RuleEventActionStep_AlertDTD;
// 	}


// 	get params(): string {
// 		return this.rawData.params;
// 	}
// 	set params(val: string) {
// 		this.rawData.params = val;
// 	}

// 	get content(): string {
// 		return this.rawData.content;
// 	}
// 	set content(val: string) {
// 		this.rawData.content = val;
// 	}
// }

// export class ExpressionActionStep_SetModel extends ExpressionActionStepModel {

// 	constructor(rawData: RuleEventActionStep_SetDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_SetDTD {
// 		return this._rawData as RuleEventActionStep_SetDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }

// export class ExpressionActionStep_ValidationModel extends ExpressionActionStepModel {

// 	// TODO: Check and Impl
// 	validations: any[] = [];

// 	constructor(rawData: RuleEventActionStep_ValidationsDTD, parent: EventExpressionActionModel) {
// 		super(rawData, parent);
// 	}

// 	private get rawData(): RuleEventActionStep_ValidationsDTD {
// 		return this._rawData as RuleEventActionStep_ValidationsDTD;
// 	}

// 	get targetControl(): string {
// 		return this.rawData.targetControl;
// 	}
// 	set targetControl(val: string) {
// 		this.rawData.targetControl = val;
// 	}
// }



