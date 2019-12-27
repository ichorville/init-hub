import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent, BsModalRef } from 'ngx-bootstrap';

import { FormGeneratorService } from '../form-generator.service';
import { CSIExpressionBuilderService } from '../../../shared/expression-builder/expression-builder.service';
import { CsiDynamicFormService } from '@csi/csi-dynamic-form';

@Component({
	selector: 'app-form-settings',
	templateUrl: './form-settings.component.html',
	styleUrls: ['./form-settings.component.css']
})
export class FormSettingsComponent implements OnInit {
	ruleJSONLoaded: boolean = false;
	bsModalRef: BsModalRef;
	components: any[];
	duplicateComponents: any;
	@ViewChild('staticTabs') staticTabs: TabsetComponent;

	constructor(
		public _fgs: FormGeneratorService,
		private _ebs: CSIExpressionBuilderService
	) {
		this._fgs.addMasterDatatableGetter().subscribe(res => {
			if (res == true) {
				this._fgs.ruleComponents.push({
					componentKey: 'Datatable',
					componentName: 'Datatable',
					componentType: 'grid',
					rules: []
				});
			} else {
				this._fgs.ruleComponents = this._fgs.ruleComponents.filter(element => element.componentKey != 'Datatable');
			}
			this.ngOnInit();
		});

		this._fgs.reloadMasterGrid.subscribe(res=>{
			this.reloadMasterGridConfigs();
		})
	}

	ngOnInit() {
		this.components = this._fgs.ruleComponents.map(widget => ({ ...widget }));
		this.duplicateComponents = JSON.stringify(this.components);
	}

	onClose() {
		this._fgs.ruleComponents = JSON.parse(this.duplicateComponents);
		this._ebs.expressionClearSetter(true);
		this.bsModalRef.hide()
	}

	onCloseSave() {
		this._ebs.expressioBuilderExitSetter(true);
		this.bsModalRef.hide()
	}

	expressionResults(event) {
		// save customized new set of expressions
		this._fgs.ruleComponents = event.map(widget => ({ ...widget }));
	}

	/**
	 * Indicate the necessacity of a grid for the current form
	 * @param event 
	 */
	onGridChange(event) {
		this._fgs.gridAvailability == !this._fgs.gridAvailability;
		// include grid structure to form meta-data
		if (this._fgs.gridAvailability == true) {
			// check if current grid has already been included
			if (this._fgs.widgets.filter(element => element.title === 'Datatable').length == 0) {
				let selectedFiels = []

				// Exclude following fields from master grid
				this._fgs.widgets.forEach(element => {
					if(element.content !== "image" 
					&& element.content!=="formLogo" 
					&& element.content!=="imageAnnotator"
					&& element.content!=="customText"
					&& element.content!=="imageUpload"
					&& element.content!=="tabularEntry"){
						selectedFiels.push(element.title)
					}
				});

				let currentGridWidget = {
					x: 4, y: 0, w: 3, h: 1,
					title: 'Datatable',
					dragAndDrop: true,
					resizable: true,
					content: 'grid',
					controlContent: {
						gridData: {},
						controlType: "gridItem",
						deletable: true,
						editable: true,
						gridName: "currentGridWidget",
						selectedFiels: selectedFiels
					},
					masterType: 'grid'
				};

				this._fgs.widgets.push(currentGridWidget);

				// add to expression builder array
				this._fgs.addMasterDatatableSetter(true);
			}
		} else {
			// remove current grid from widget set
			this._fgs.widgets = this._fgs.widgets.filter(element => element.title != 'Datatable');
			this._fgs.addMasterDatatableSetter(false);
		}
	}

	// This method has been created for update master grid columns while updating other fields
	reloadMasterGridConfigs(){
		let selectedFiels = []

		// Exclude following fields from master grid
		this._fgs.widgets.forEach(element => {
			if(element.content !== "image" 
			&& element.content!=="formLogo" 
			&& element.content!=="imageAnnotator"
			&& element.content!=="customText"
			&& element.content!=="imageUpload"
			&& element.content!=="tabularEntry"
			&& element.title!=="Datatable"){
				selectedFiels.push(element.title)
			}
		});
		
		this._fgs.widgets.forEach((element,key)=>{
			if(element.title === "Datatable") {
				this._fgs.widgets[key].controlContent.selectedFiels = selectedFiels
			}
		})
	}

	onSaveOptionChanged(event){
		this._fgs.formSaveOption = event.target.value;
	}

	onFieldMandatoryChanged(){
		this._fgs.allFieldsMandatory = !this._fgs.allFieldsMandatory
	}

	onHideFromTitleChanged(){
		this._fgs.hideFormTitle = !this._fgs.hideFormTitle
	}
}