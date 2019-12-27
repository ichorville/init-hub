import {
  RuleEventActionStepDTD,
  EVENT_ACTION_STEP_TYPE,
  RuleEventActionStep_HideDTD,
  RuleEventActionStep_ShowDTD,
  RuleEventActionStep_EnableDTD,
  RuleEventActionStep_DisableDTD,
  RuleEventActionStep_AlertDTD,
  RuleEventActionStep_SetDTD,
  RuleEventActionStep_ValidationsDTD,
  RuleEventActionStep_ShowFormDTD
} from '../../services/dtd/expression-builder.dtd';
import { EventExpressionActionModel } from '../event-expression-action.model';
import { ExpressionActionStepModel } from '../expression-action-step.model';
import {
  ExpressionActionStep_HideModel,
  ExpressionActionStep_ShowModel,
  ExpressionActionStep_EnableModel,
  ExpressionActionStep_DisableModel,
  ExpressionActionStep_AlertModel,
  ExpressionActionStep_SetModel,
  ExpressionActionStep_ValidationModel,
  ExpressionActionStep_ShowFormModel
} from '../exp-action-steps/expression-action-steps.model';


export abstract class FactoryActionStepModel {

	private constructor() {

	}

	static factoryCreate(rawData: RuleEventActionStepDTD, parent: EventExpressionActionModel): ExpressionActionStepModel {
		let inst: ExpressionActionStepModel = null;

		switch (rawData.type) {
			case EVENT_ACTION_STEP_TYPE.HIDE:
				inst = new ExpressionActionStep_HideModel(<RuleEventActionStep_HideDTD>rawData, parent);
				break;

			case EVENT_ACTION_STEP_TYPE.SHOW:
				inst = new ExpressionActionStep_ShowModel(<RuleEventActionStep_ShowDTD>rawData, parent);
				break;

      case EVENT_ACTION_STEP_TYPE.SHOW_FORM:
        inst = new ExpressionActionStep_ShowFormModel(<RuleEventActionStep_ShowFormDTD>rawData, parent);
        break;

			case EVENT_ACTION_STEP_TYPE.ENABLE:
				inst = new ExpressionActionStep_EnableModel(<RuleEventActionStep_EnableDTD>rawData, parent);
				break;

			case EVENT_ACTION_STEP_TYPE.DISABLE:
				inst = new ExpressionActionStep_DisableModel(<RuleEventActionStep_DisableDTD>rawData, parent);
				break;

			case EVENT_ACTION_STEP_TYPE.ALERT:
				inst = new ExpressionActionStep_AlertModel(<RuleEventActionStep_AlertDTD>rawData, parent);
				break;

			case EVENT_ACTION_STEP_TYPE.SET:
				inst = new ExpressionActionStep_SetModel(<RuleEventActionStep_SetDTD>rawData, parent);
				break;

			case EVENT_ACTION_STEP_TYPE.VALIDATIONS:
				inst = new ExpressionActionStep_ValidationModel(<RuleEventActionStep_ValidationsDTD>rawData, parent);
				break;
		}

		return inst;
	}

}
