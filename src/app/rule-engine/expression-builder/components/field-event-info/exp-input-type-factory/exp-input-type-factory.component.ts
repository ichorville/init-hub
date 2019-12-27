
import {
	Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnChanges, SimpleChanges,
	ComponentRef, Output, EventEmitter, forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ExpInputTypeBaseComponent } from './exp-input-types/exp-input-type-base/exp-input-type-base.component';
import { ExpInputTypeNumberComponent } from './exp-input-types/exp-input-type-number/exp-input-type-number.component';
import { ExpInputTypeStringComponent } from './exp-input-types/exp-input-type-string/exp-input-type-string.component';
import { ExpInputTypeAPIComponent } from './exp-input-types/exp-input-type-api/exp-input-type-api.component';
import { ExpInputTypeMasterDataComponent } from './exp-input-types/exp-input-type-masterdata/exp-input-type-masterdata.component';
import { ExpInputTypeFieldComponent } from './exp-input-types/exp-input-type-field/exp-input-type-field.component';
import {EXP_INPUT_TYPE_ENUM} from "../../../models/exp-input-types/exp-input-type.enum";
import {ComponentEventExpressionModel} from "../../../models/component-event-expression.model";
import {RuleModuleScreenModel} from "../../../models/rule-module-screen.model";

@Component({
	selector: 'app-exp-input-type-factory',
	templateUrl: './exp-input-type-factory.component.html',
	styleUrls: ['./exp-input-type-factory.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ExpInputTypeFactoryComponent),
			multi: true
		}
	]
})
export class ExpInputTypeFactoryComponent implements OnInit, OnChanges, ControlValueAccessor {
	@ViewChild('compContainer', { read: ViewContainerRef }) compContainer: ViewContainerRef;
	@Input() eventExpModel: ComponentEventExpressionModel = null;

	private _value: any;
	@Output() valueChange = new EventEmitter<any>();


	private componentRef: ComponentRef<ExpInputTypeBaseComponent<any>> = null;
	private _inputType: EXP_INPUT_TYPE_ENUM = '-1' as EXP_INPUT_TYPE_ENUM;
	private isFirstTimeLoad = true;
	private isFirstTimeSet = true;

	EXP_INPUT_TYPE_ENUM = EXP_INPUT_TYPE_ENUM;


	constructor(private factoryResolver: ComponentFactoryResolver) {

	}

	/**
	 * @implements
	 */
	ngOnInit() {
	}

	/**
	 * @implements
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes['inputType']) {
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

	get inputType(): EXP_INPUT_TYPE_ENUM {
		return this._inputType;
	}

	@Input()
	set inputType(val: EXP_INPUT_TYPE_ENUM) {
		this._inputType = val;

		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = null;
		}

		this.recreateComponent();
	}

	get value(): any {
		return this._value;
	}

	@Input()
	set value(val: any) {
		this.writeValue(val);
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	recreateComponent() {
		let componentFactory = null;
		// let componentRef = null;
		let inst: ExpInputTypeBaseComponent<any> = null;

		switch (this.inputType) {
			case EXP_INPUT_TYPE_ENUM.NUMBER:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpInputTypeNumberComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpInputTypeNumberComponent>this.componentRef.instance);
				inst.valueChange.subscribe(this.onValueChange.bind(this));
				break;

			case EXP_INPUT_TYPE_ENUM.STRING:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpInputTypeStringComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpInputTypeStringComponent>this.componentRef.instance);
				inst.valueChange.subscribe(this.onValueChange.bind(this));
				break;

			case EXP_INPUT_TYPE_ENUM.API:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpInputTypeAPIComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpInputTypeAPIComponent>this.componentRef.instance);
				inst.valueChange.subscribe(this.onValueChange.bind(this));
				break;

			case EXP_INPUT_TYPE_ENUM.MASTER_DATA:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpInputTypeMasterDataComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpInputTypeMasterDataComponent>this.componentRef.instance);
				inst.valueChange.subscribe(this.onValueChange.bind(this));
				break;

			case EXP_INPUT_TYPE_ENUM.FIELD:
				componentFactory = this.factoryResolver.resolveComponentFactory(ExpInputTypeFieldComponent);
				this.componentRef = this.compContainer.createComponent(componentFactory);
				inst = (<ExpInputTypeFieldComponent>this.componentRef.instance);
				inst.valueChange.subscribe(this.onValueChange.bind(this));

				if (this.eventExpModel) {
					const ruleModel: RuleModuleScreenModel = this.eventExpModel.getRootParent();
					if (ruleModel) {
						(<ExpInputTypeFieldComponent>inst).fields = ruleModel.components || [];
					}
				}
				break;

			default:
				break;
		}

		if (inst && this.isFirstTimeLoad) {
			inst.setValue(this._value);
			this.isFirstTimeLoad = false;
		}
	}



	/* ***********************************************************
	*** NG MODEL SUPPORT METHODS
	*************************************************************/

	/**
	 * @param obj
	 *
	 * @implements
	 */
	writeValue(obj: any): void {
		this._value = obj;
		this.onChange(this.value);

		if (this._value) {
			const aData = ('' + this._value).split('|');
			if (aData.length && this.isFirstTimeSet) {
				this.inputType = aData[0] as EXP_INPUT_TYPE_ENUM;
				this.isFirstTimeSet = false;
			}
		}
	}

	/**
	 * @param fn
	 *
	 * @implements
	 */
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	/**
	 * @param fn
	 *
	 * @implements
	 */
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	/**
	 * @param isDisabled
	 *
	 * @implements
	 */
	setDisabledState?(isDisabled: boolean): void {
		console.log('Method not implemented.');
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onChange = (val: any) => { };
	onTouched = () => { };


	onValueChange(event) {
		this.value = event;
	}

}
