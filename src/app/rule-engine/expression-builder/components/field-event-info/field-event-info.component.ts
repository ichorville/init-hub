import { Component, OnInit, Input } from '@angular/core';
import { RuleSet, Rule, QueryBuilderConfig, QueryBuilderClassNames } from 'angular2-query-builder';
import { ComponentEventExpressionModel } from '../../models/component-event-expression.model';
import { ExpressionActionsModalComponent } from '../modals/expression-actions-modal/expression-actions-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { ExpressionActionsModalData } from '../modals/expression-actions-modal/modal-data/expression-actions-modal-data';
import { QueryGenarateModel } from '../../models/querygenaratemodel';
import { RuleModuleScreenModel } from '../../models/rule-module-screen.model';

@Component({
	selector: 'app-field-event-info',
	templateUrl: './field-event-info.component.html',
	styleUrls: ['./field-event-info.component.css']
})
export class FieldEventInfoComponent implements OnInit {
	@Input() eventExpression: ComponentEventExpressionModel = null;
	config: QueryBuilderConfig = {
		fields: {
		
		}
	};

	classNames: QueryBuilderClassNames = {
		removeIcon: 'fa fa-minus',
		addIcon: 'fa fa-plus',
		button: 'btn btn-sm',
		buttonGroup: 'btn-group',
		rightAlign: 'order-12 ml-auto',
		switchRow: 'd-flex px-2',
		switchGroup: 'd-flex align-items-center',
		switchRadio: 'custom-control-input',
		switchLabel: 'custom-control-label',
		switchControl: 'custom-control custom-radio custom-control-inline',
		row: 'row p-2 m-1',
		rule: 'border',
		ruleSet: 'border',
		invalidRuleSet: 'alert alert-danger',
		operatorControl: 'form-control form-control-sm',
		operatorControlSize: 'col-auto px-0',
		fieldControl: 'form-control form-control-sm',
		fieldControlSize: 'col-auto',
		inputControl: 'form-control form-control-sm',
		inputControlSize: 'col-auto'
	};

	constructor(
		private _bsModalService: BsModalService
	) {

	}

	ngOnInit() {
		console.log(this.eventExpression)
		const ruleModel: RuleModuleScreenModel = this.eventExpression.getRootParent();
		console.log(ruleModel)
		if (ruleModel) {
			for (let i = 0; i < ruleModel.components.length; i++) {
				const rule = ruleModel.components[i];

				if (!this.config.fields[rule.componentKey]) {
					this.config.fields[rule.componentKey] = {
						name: rule.componentName,
						type: 'dynamic',
						operators: ['=', '!=', '>', '<']
					};
				}
			}
		}
		console.log(this.config)
	}


	/* ***********************************************************
	  *** PROPERTY GETTER/SETTERS
	  *************************************************************/

	get query(): RuleSet {
		return this.eventExpression.query;
	}
	set query(val: RuleSet) {
		this.eventExpression.query = val;
	}

	_test;
	get test() {
		return this._test;
	}
	set test(val) {
		this._test = val;
		console.log('SETTT ', val);
	}



	/* **************************************************************************************************************
	  *** METHODS
	  ****************************************************************************************************************/

	alert(message) {
		alert(message);
		// this._csiAlertService.success('Message', message, 'OK', 'btn');
	}

	alertError(message) {
		alert(message);
		// this._csiAlertService.success('Error', message, 'OK', 'btn');
	}

	confirm(message) {

	}

	private _extractRuleConditions(ruleSet: RuleSet, parentExp: string): string {
		return '';
	}

	generateExpression(): string {
		let finalExp = '';

		finalExp = this._extractRuleConditions(this.query, '');

		return finalExp;
	}



	/* **************************************************************************************************************
	  *** EVENTS
	  ****************************************************************************************************************/

	onClick_Test(event) {
		const modalRef = this._bsModalService.show(ExpressionActionsModalComponent, {
			class: 'modal-lg',
			ignoreBackdropClick: true,
			initialState: {
				data: {
					eventExpression: this.eventExpression
				} as ExpressionActionsModalData
			}
		});
	}

	onValueChange_InputFactory(event) {
		console.log('onValueChange_InputFactory: ', event);
		this.eventExpression.updateExpression();
	}

	onChange_DynamicInput(event) {
		console.log('onChange_DynamicInput: ', event);
	}
}
