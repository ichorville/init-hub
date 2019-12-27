import {
	RuleComponentEventInfoDTD, EVENT_ACTION_TYPE
} from '../services/dtd/expression-builder.dtd';
import { RuleComponentModel } from './rule-component.model';
import { EventExpressionActionModel } from './event-expression-action.model';
import { IRawData } from './interfaces/raw-data.interface';
import { RuleSet } from 'angular2-query-builder';
import { RuleModuleScreenModel } from './rule-module-screen.model';
import { QueryGenarateModel } from './querygenaratemodel';
import { EXP_INPUT_TYPE_ENUM } from './exp-input-types/exp-input-type.enum';

export class ComponentEventExpressionModel implements IRawData<RuleComponentEventInfoDTD> {
	private _rawData: RuleComponentEventInfoDTD = null;
	private _parent: RuleComponentModel = null;

	eventKey: string = null;

	// expression = '';
	success_actions: any[] = [];
	fail_actions: any[] = [];

	private constructor(eventKey: string, rawData: RuleComponentEventInfoDTD, parent: RuleComponentModel) {
		this.eventKey = eventKey;
		this._rawData = rawData;
		this._parent = parent;

		if (this._rawData) {
			// this.expression = this._rawData.exp;

			if (!this._rawData.query) {
				this._rawData.query = {
					condition: 'and',
					rules: []
				};
			}

			if (this._rawData.success_actions) {
				for (let i = 0; i < this._rawData.success_actions.length; i++) {
					const rawAction = this._rawData.success_actions[i];
					const action = EventExpressionActionModel.factoryCreate(rawAction, this);

					this.success_actions.push(action);
				}
			} else {
				this._rawData.success_actions = [];
			}
			if (this._rawData.fail_actions) {
				for (let i = 0; i < this._rawData.fail_actions.length; i++) {
					const rawAction = this._rawData.fail_actions[i];
					const action = EventExpressionActionModel.factoryCreate(rawAction, this);

					this.fail_actions.push(action);
				}
			} else {
				this._rawData.fail_actions = [];
			}
		}
	}

	static createInstance(eventKey: string, rawData: RuleComponentEventInfoDTD, parent: RuleComponentModel): ComponentEventExpressionModel {
		const instance = new ComponentEventExpressionModel(eventKey, rawData, parent);

		return instance;
	}

	static createNew(eventKey: string, parent: RuleComponentModel): ComponentEventExpressionModel {
		const rawData: RuleComponentEventInfoDTD = {
			event: eventKey,
			exp: '',
			field: '',
			success_actions: [],
			fail_actions: []
		};

		const instance = new ComponentEventExpressionModel(eventKey, rawData, parent);

		return instance;
	}


	get query(): RuleSet {
		return this._rawData.query;
	}
	set query(val: RuleSet) {
		this._rawData.query = val;

		this.updateExpression();
	}

	get expression(): string {
		return this._rawData.exp;
	}
	set expression(val: string) {
		this._rawData.exp = val;
	}

	get field(): string {
		return this._rawData.field;
	}
	set field(val: string) {
		this._rawData.field = val;
	}


	addSuccessAction(actionType: EVENT_ACTION_TYPE) {
		const newAction = EventExpressionActionModel.factoryCreate({
			type: actionType as any,
			parameters: '',
			endPoint: '',
			actionSteps: []
		}, this);

		this.success_actions.push(newAction);
		this._rawData.success_actions.push(newAction.toJson());
	}

	addFailAction(actionType: EVENT_ACTION_TYPE) {
		const newAction = EventExpressionActionModel.factoryCreate({
			type: actionType as any,
			parameters: '',
			endPoint: '',
			actionSteps: []
		}, this);

		this.fail_actions.push(newAction);
		this._rawData.fail_actions.push(newAction.toJson());
	}


	getRootParent(): RuleModuleScreenModel {
		if (this._parent && this._parent.getParent()) {
			return this._parent.getParent();
		}

		return null;
	}

	updateExpression() {
		try {
			const genaratedString = this.genarateQueryString(new QueryGenarateModel(this.query, '', ''));
			this.expression = '{' + (genaratedString.genaratedQuery.replace(/ /gi, '')) + '}';
			this.field = genaratedString.fields;
		} catch (e) {
			console.log(e);
		}
	}


	private getOperator(op: string): string {
		switch (op) {
			case '=':
				return '==';
		}

		return op;
	}

	private extractValue(val) {
		let finalvalue = '';
		if (val) {
			const aData = ('' + val).split('|');
			const type = aData[0];

			if (type === EXP_INPUT_TYPE_ENUM.FIELD) {
				finalvalue = `[${aData[aData.length - 1]}]`;
			} else {
				finalvalue = aData[aData.length - 1];
			}
		}

		return finalvalue;
	}

	private getConditionClause(condition: string): string {
		switch (condition) {
			case 'or':
				return '||';

			case 'and':
				return '&&';
		}

		return '';
	}

	private genarateQueryString(object: QueryGenarateModel) {
		// debugger
		const parentCondition: string = this.getConditionClause(object.data.condition);
		object.genaratedQuery += '(';
		object.data.rules.forEach((rule, index) => {
			if (!this.instanceOfRuleSet(rule)) {
				// if (object.fields.search(new RegExp(`\b(${rule.field})\b`, 'gi')) === -1) {
				if (object.fields.search(new RegExp('\\b(' + rule.field + ')\\b', 'gi')) === -1) {
					// if (object.fields.search(/\b(\()\b/gi) === -1) {
					if (object.fields) {
						object.fields += ',';
					}
					object.fields += rule.field;
				}


				if (index !== 0) {
					object.genaratedQuery += (' ' + parentCondition + ' ');
				}
				object.genaratedQuery += '( ' + ((rule.field) + (' ')
					+ (this.getOperator(rule.operator)) + (' ')
					+ (this.extractValue(rule.value))) + ' )';
			} else {
				if (index !== 0) {
					object.genaratedQuery += (' ' + parentCondition + ' ');
				}
				object = this.genarateQueryString(new QueryGenarateModel(rule, object.genaratedQuery, object.fields));
			}
		});
		object.genaratedQuery += (')');
		return object;
	}

	private instanceOfRuleSet(object: any): object is RuleSet {
		return 'condition' in object;
	}


	toRawData(): RuleComponentEventInfoDTD {
		return this._rawData;
	}
}

