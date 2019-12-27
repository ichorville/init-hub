import { RuleSet } from 'angular2-query-builder';
import { COMPONENT_TYPE_ENUM } from '../../models/component-type.enum';

export enum EVENT_ACTION_STEP_TYPE {
	SHOW = 'show',
	SHOW_FORM = 'showForm',
	HIDE = 'hide',
	ENABLE = 'enable',
	DISABLE = 'disable',
	ALERT = 'alert',
	SET = 'set',
	VALIDATIONS = 'validations'
}

export interface RuleEventActionStep_Base {
	type: EVENT_ACTION_STEP_TYPE;
}
export interface RuleEventActionStep_ShowDTD extends RuleEventActionStep_Base {
	targetControl: string;
}
export interface RuleEventActionStep_HideDTD extends RuleEventActionStep_Base {
	targetControl: string;
}
export interface RuleEventActionStep_EnableDTD extends RuleEventActionStep_Base {
	targetControl: string;
}
export interface RuleEventActionStep_DisableDTD extends RuleEventActionStep_Base {
	targetControl: string;
}
export interface RuleEventActionStep_AlertDTD extends RuleEventActionStep_Base {
	/**
	 * FORMAT: "param1,param2"
	 */
	params: string;
	/**
	 * FORMAT: "Alert content {param1} {param2}"
	 */
	content: string;
}
export interface RuleEventActionStep_SetDTD extends RuleEventActionStep_Base {
	targetControl: string;
	value: string;
}
export interface RuleEventActionStep_ValidationsDTD extends RuleEventActionStep_Base {
	targetControl: string;
	validations: Array<{ type: 'required' } | { type: 'min' | 'max'; value: number; }>;
}
export interface RuleEventActionStep_ShowFormDTD extends RuleEventActionStep_Base {
	targetFormId: string;
}


export type RuleEventActionStepDTD =
	RuleEventActionStep_ShowFormDTD |
	RuleEventActionStep_ShowDTD |
	RuleEventActionStep_HideDTD |
	RuleEventActionStep_EnableDTD |
	RuleEventActionStep_DisableDTD |
	RuleEventActionStep_AlertDTD |
	RuleEventActionStep_SetDTD |
	RuleEventActionStep_ValidationsDTD;



export enum EVENT_ACTION_TYPE {
	IN_APP = 'inapp',
	SERVICE_CALL = 'serviceCall'
}

interface IRuleComponentEventAction_Base {
	type: EVENT_ACTION_TYPE;
}
export interface RuleComponentEventAction_InAppDTD extends IRuleComponentEventAction_Base {
	// type: 'inapp';
	actionSteps: RuleEventActionStepDTD[];
}
export interface RuleComponentEventAction_ServiceCallDTD extends IRuleComponentEventAction_Base {
	// type: 'serviceCall';
	/**
	 * FORMAT: "field1,field2"
	 */
	parameters: string;
	/**
	 * FORMAT: "/notification/xyz"
	 */
	endPoint: string;
}
 
export type RuleComponentEventActionDTD = RuleComponentEventAction_InAppDTD | RuleComponentEventAction_ServiceCallDTD;

export interface RuleComponentEventInfoDTD {
	/**
	 * FORMAT: field1,field2,field3
	 */
	field: string;
	event: string; // 'click' | 'change' | 'keyup';
	exp: string;
	// expression: string;
	query?: RuleSet;
	success_actions: RuleComponentEventActionDTD[];
	fail_actions: RuleComponentEventActionDTD[];
}

export interface RuleComponentDTD {
	componentKey: string;
	componentName: string;
	componentType: COMPONENT_TYPE_ENUM;
	// rules?: RuleComponentEventDTD;
	rules?: RuleComponentEventInfoDTD[];
	attributes?: {
		isVisible: boolean;
		isEditable: boolean;
	};

	components?: RuleComponentDTD[]; // Screen Permission Specific.
}

export interface RuleModuleScreenDTD {
	id?: number;
	isActive?: boolean;
	rowVersion?: number;

	moduleKey: string;
	moduleName: string;
	screenKey: string;
	screenName: string;
	components?: RuleComponentDTD[];
}

export type RulesDTD = RuleModuleScreenDTD;


