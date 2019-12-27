import {
	Component, OnInit, Input, OnDestroy, Output, EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ExpressionActionsModalData } from './modal-data/expression-actions-modal-data';
import { ComponentEventExpressionModel } from '../../../models/component-event-expression.model';
import {EventExpressionActionModel} from "../../../models/event-expression-action.model";



@Component({
	selector: 'app-expression-actions-modal',
	templateUrl: './expression-actions-modal.component.html',
	styleUrls: ['./expression-actions-modal.component.css']
})
export class ExpressionActionsModalComponent implements OnInit, OnDestroy {
	@Input() data: ExpressionActionsModalData = null;
	// @Output() modalConfirm = new EventEmitter<boolean>();

	isLoading = false;

	selectedNewActionKey_Success = '-1';
	selectedNewActionKey_Fail = '-1';
	selectedAction_Success: EventExpressionActionModel = null;
	selectedAction_Fail: EventExpressionActionModel = null;


	constructor(
		public bsModalRef: BsModalRef
	) { }

	ngOnInit() {

	}

	ngOnDestroy(): void {
	}



	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get eventExpression(): ComponentEventExpressionModel {
		if (this.data) {
			return this.data.eventExpression;
		}

		return null;
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

	closeModal() {
		this.bsModalRef.hide();
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onClick_Done($event) {
		this.closeModal();
	}

	onClick_Close($event) {
		this.closeModal();
	}

	onClick_AddSuccessAction($event) {
		if (!this.selectedNewActionKey_Success) {
			this.alert('Please select an action type.');
			return;
		}

		this.data.eventExpression.addSuccessAction(this.selectedNewActionKey_Success as any);
		console.log(this.data)
	}

	onClick_AddFailAction($event) {
		if (!this.selectedNewActionKey_Fail) {
			this.alert('Please select an action type.');
			return;
		}

		this.data.eventExpression.addFailAction(this.selectedNewActionKey_Fail as any);
	}

	onSelect_SuccessAction(event: EventExpressionActionModel) {
		this.selectedAction_Success = event;
	}

	onSelect_FailAction(event: EventExpressionActionModel) {
		this.selectedAction_Fail = event;
	}

}
