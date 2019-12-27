import {
	OnInit, OnChanges, ViewContainerRef, SimpleChanges, Input, ViewChild, Component, ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import { EVENT_ACTION_STEP_TYPE } from '../../../services/dtd/expression-builder.dtd';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import { ExpressionActionStepModel } from '../../../models/expression-action-step.model';
import { ActionStepAlertComponent } from '../action-step-alert/action-step-alert.component';
import { ActionStepHideComponent } from '../action-step-hide/action-step-hide.component';
import { ActionStepShowComponent } from '../action-step-show/action-step-show.component';
import { ActionStepShowFormComponent } from '../action-step-show-form/action-step-show-form.component';
import { ActionStepValidationsComponent } from '../action-step-validations/action-step-validations.component';
import { ActionStepEnableComponent } from '../action-step-enable/action-step-enable.component';
import { ActionStepDisableComponent } from '../action-step-disable/action-step-disable.component';
import { ActionStepSetComponent } from '../action-step-set/action-step-set.component';


@Component({
	selector: 'app-action-steps-factory',
	templateUrl: './action-steps-factory.component.html',
	styleUrls: ['./action-steps-factory.component.css']
})
export class ActionStepsFactoryComponent implements OnInit, OnChanges {
	@Input() actionData: ExpressionActionStepModel = null;
	@ViewChild('compContainer', { read: ViewContainerRef }) compContainer: ViewContainerRef;

	private componentRef: ComponentRef<ActionStepBaseComponent> = null;

	constructor(private factoryResolver: ComponentFactoryResolver) {

	}

	ngOnInit() {
		this.recreateComponent();
	}

	ngOnChanges(changes: SimpleChanges): void {
		// if (changes && changes['actionData']) {
		// 	if (this.componentRef) {
		// 		this.componentRef.destroy();
		// 		this.componentRef = null;
		// 	}

		// 	this.recreateComponent();
		// }
	}



	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/




	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	recreateComponent() {
		let componentFactory = null;
		// let componentRef = null;
		let inst: ActionStepBaseComponent = null;

		switch (this.actionData.type) {
			case EVENT_ACTION_STEP_TYPE.ALERT:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepAlertComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepAlertComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_STEP_TYPE.HIDE:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepHideComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepHideComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_STEP_TYPE.SHOW:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepShowComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepShowComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

      case EVENT_ACTION_STEP_TYPE.SHOW_FORM:
        componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepShowFormComponent);
        this.componentRef = this.compContainer.createComponent(componentFactory);
        inst = (<ActionStepShowFormComponent>this.componentRef.instance);
        inst.actionData = this.actionData;
        break;

			case EVENT_ACTION_STEP_TYPE.ENABLE:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepEnableComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepEnableComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_STEP_TYPE.DISABLE:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepDisableComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepDisableComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_STEP_TYPE.SET:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepSetComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepSetComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_STEP_TYPE.VALIDATIONS:
				componentFactory = this.factoryResolver.resolveComponentFactory(ActionStepValidationsComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ActionStepValidationsComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			default:
				break;
		}
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
