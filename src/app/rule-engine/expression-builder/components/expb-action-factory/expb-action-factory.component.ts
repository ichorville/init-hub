
import {
	Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnChanges, SimpleChanges, ComponentRef
} from '@angular/core';
import { EVENT_ACTION_TYPE } from '../../services/dtd/expression-builder.dtd';
import { ExpActionInAppComponent } from '../exp-actions/exp-action-inapp/exp-action-inapp.component';
import { ExpActionBaseComponent } from '../exp-actions/exp-action-base/exp-action-base.component';
import { ExpActionServiceCallComponent } from '../exp-actions/exp-action-servicecall/exp-action-servicecall.component';
import { EventExpressionActionModel } from '../../models/event-expression-action.model';

@Component({
	selector: 'app-expb-action-factory',
	templateUrl: './expb-action-factory.component.html',
	styleUrls: ['./expb-action-factory.component.css']
})
export class EXPBActionFactoryComponent implements OnInit, OnChanges {
	@Input() actionData: EventExpressionActionModel = null;
	@ViewChild('compContainer', { read: ViewContainerRef }) compContainer: ViewContainerRef;

	private componentRef: ComponentRef<ExpActionBaseComponent> = null;

	constructor(private factoryResolver: ComponentFactoryResolver) {

	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes['actionData']) {
			if (this.componentRef) {
				this.componentRef.destroy();
				this.componentRef = null;
			}

			this.recreateComponent();
		}
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
		let inst: ExpActionBaseComponent = null;

		switch (this.actionData.type) {
			case EVENT_ACTION_TYPE.IN_APP:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpActionInAppComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpActionInAppComponent>this.componentRef.instance);
				inst.actionData = this.actionData;
				break;

			case EVENT_ACTION_TYPE.SERVICE_CALL:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpActionServiceCallComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpActionServiceCallComponent>this.componentRef.instance);
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
