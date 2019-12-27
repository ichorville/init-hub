import { EventExpressionActionModel } from '../event-expression-action.model';
import {
  RuleEventActionStep_HideDTD,
  RuleEventActionStep_ShowDTD,
  RuleEventActionStep_AlertDTD,
  RuleEventActionStep_ValidationsDTD,
  RuleEventActionStep_SetDTD,
  RuleEventActionStep_EnableDTD,
  RuleEventActionStep_DisableDTD,
  RuleEventActionStep_ShowFormDTD
} from '../../services/dtd/expression-builder.dtd';
import { ExpressionActionStepModel } from '../expression-action-step.model';



export class ExpressionActionStep_HideModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_HideDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_HideDTD {
		return this._rawData as RuleEventActionStep_HideDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

export class ExpressionActionStep_ShowModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_ShowDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_ShowDTD {
		return this._rawData as RuleEventActionStep_ShowDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

export class ExpressionActionStep_ShowFormModel extends ExpressionActionStepModel {

  constructor(rawData: RuleEventActionStep_ShowFormDTD, parent: EventExpressionActionModel) {
    super(rawData, parent);
  }

  private get rawData(): RuleEventActionStep_ShowFormDTD {
    return this._rawData as RuleEventActionStep_ShowFormDTD;
  }

  get targetControl(): string {
    return this.rawData.targetFormId;
  }
  set targetControl(val: string) {
    this.rawData.targetFormId = val;
  }
}

export class ExpressionActionStep_EnableModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_EnableDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_EnableDTD {
		return this._rawData as RuleEventActionStep_EnableDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

export class ExpressionActionStep_DisableModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_DisableDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_DisableDTD {
		return this._rawData as RuleEventActionStep_DisableDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

export class ExpressionActionStep_AlertModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_AlertDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_AlertDTD {
		return this._rawData as RuleEventActionStep_AlertDTD;
	}


	get params(): string {
		return this.rawData.params;
	}
	set params(val: string) {
		this.rawData.params = val;
	}

	get content(): string {
		return this.rawData.content;
	}
	set content(val: string) {
		this.rawData.content = val;
	}
}

export class ExpressionActionStep_SetModel extends ExpressionActionStepModel {

	constructor(rawData: RuleEventActionStep_SetDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_SetDTD {
		return this._rawData as RuleEventActionStep_SetDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

export class ExpressionActionStep_ValidationModel extends ExpressionActionStepModel {

	// TODO: Check and Impl
	validations: any[] = [];

	constructor(rawData: RuleEventActionStep_ValidationsDTD, parent: EventExpressionActionModel) {
		super(rawData, parent);
	}

	private get rawData(): RuleEventActionStep_ValidationsDTD {
		return this._rawData as RuleEventActionStep_ValidationsDTD;
	}

	get targetControl(): string {
		return this.rawData.targetControl;
	}
	set targetControl(val: string) {
		this.rawData.targetControl = val;
	}
}

