import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GridsterComponent, IGridsterOptions } from 'angular2gridster';
import { CsiToastsService } from '@csi/csi-toastr';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';

import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { FormGeneratorService } from '../form-generator.service';
import { FieldUsageComponent } from "../field-usage/field-usage.component";
import { FieldGeneratorService } from '../../field-generator/field-generator.service';
import { LogUserService } from '@csi/csi-services-gateway';
import * as uuid from 'uuid';

@Component({
  selector: 'app-field-grid',
  templateUrl: './field-grid.component.html',
  styleUrls: ['./field-grid.component.css']
})
export class FieldGridComponent implements OnInit {
  widgetsCopy = [];
  formName: string;
  currentFormObject = {};
  @ViewChild(GridsterComponent) gridster: GridsterComponent;

	@Output() openRightNav: any = new EventEmitter<any>();
	@Output() fieldRemoved: EventEmitter<any> = new EventEmitter();

  saveFormSubscription: any;
  gridsterConfigReloadSubscription: any;
  bsModalRef: BsModalRef;
  previewSelected: boolean = false;

  selectedWidget:string;

	constructor(
		public _fgs: FormGeneratorService,
		private BsModalService: BsModalService,
		private toastr: CsiToastsService,
		private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private logUserService: LogUserService,
		private _fieldgs: FieldGeneratorService
	) {
		// adding a new field into the canvas
		this._fgs.addFieldGetter().subscribe(res => {
      if(!res.isNewField) this.showFieldUsagePopup(res.id);

      this.selectedWidget = res.label;

			if (this._fgs.widgets.filter(element => element.title === res.label).length > 0) {
				this._fgs.widgets.filter(element => element.title === res.label)[0].previouslySelected = true,
					setTimeout(() => {
						this._fgs.widgets.filter(element => element.title === res.label)[0].previouslySelected = false
					}, 2000)
			} else {
				this._fgs.widgets.push({
					x: 4, y: 0, w: 3, h: 2,
					title: res.label,
					dragAndDrop: true,
					resizable: true,
					content: res.controlType,
					controlContent: res,
					masterType: 'field'
        }),
        
        this._fgs.loadFieldAttributes.emit({
          index: (this._fgs.widgets.length - 1),
          widget: this._fgs.widgets[this._fgs.widgets.length - 1]
        });
        
					// add to expression builder data array
					this._fgs.ruleComponents.push({
						componentKey: res.key,
						componentName: res.label,
            componentType: res.controlType,
            componentId: res.fieldDesignId,
						rules: []
					})
			}
		});
		this._fgs.useFieldUsedInFormGetter().subscribe(res => {
			let control = this._fgs.widgets.find(controls => controls.controlContent.id === res.fieldId);
			const index = this._fgs.widgets.findIndex(controls => controls.controlContent.id === res.fieldId);
			control.controlContent.apiBinding = res;
			this._fgs.widgets[index] = control;
		});
		// adding a new grid identifier to the canvas
		this._fgs.addGridGetter().subscribe(res => {
			res.controlType = 'gridItem';
			this._fgs.widgets.push({
				x: 4, y: 0, w: 3, h: 1,
				title: res.gridName,
				dragAndDrop: true,
				resizable: true,
				content: 'grid',
				controlContent: res,
				masterType: 'grid'
			});
			// add to expression builder array
			this._fgs.ruleComponents.push({
				componentKey: res.gridName,
				componentName: res.gridName,
				componentType: 'grid',
				rules: []
			});
		});

    // add an exisitng form onto the canvas
    this._fgs.addFormGetter().subscribe(res => {
      const definition = JSON.parse(decodeURI(res.definition));
      res.controlType = 'formItem';
      this._fgs.widgets.push({
        x: 4, y: 0, w: 3, h: 1,
        title: res.fieldName,
        dragAndDrop: true,
        resizable: true,
        content: 'form',
        controlContent: definition,
        masterType: 'form'
      });
      // add to expression builder array
      this._fgs.ruleComponents.push({
        componentKey: res.name,
        componentName: res.name,
        componentType: 'form',
        rules: []
      });
    });

    // load currently selected form fields onto canvas for edit scenario
    this._fgs.addFormInlineGetter().subscribe(res => {
      this.formName = res.name;
      this._fgs.widgets = res.data;
      this.currentFormObject['gridAvailability'] = res.gridAvailability;
      this._fgs.formLoadedForEdit = true;
    });

    this._fgs.addWidgetGetter().subscribe(res => {
      res.controlType = 'widgetItem';
      this._fgs.widgets.push({
        x: 4, y: 0, w: 3, h: 1,
        title: res.widgetName,
        dragAndDrop: true,
        resizable: true,
        content: 'widget',
        controlContent: res,
        masterType: 'widget'
      });
    });

    // view/ hide grid functionality
    this._fgs.gridViewGetter().subscribe(() => this.viewGrid());

		// show save form functionality
		this.saveFormSubscription = this._fgs.saveFormGetter().subscribe(() => this.preSave());

		// reload gridster configuration
		this.gridsterConfigReloadSubscription = this._fgs.reloadGridsterConfigGetter().subscribe(() => this.reloadGridsterConfig(this.gridster));
		
		// add new UI component
		this._fgs.addUIComponentGetter().subscribe(res => this.addNewUIComponent(res));
	}

  ngOnInit() {
    this.widgetsCopy = this._fgs.widgets.map(widget => ({...widget}));
  }

  showFieldUsagePopup(fieldId) {
    const configuration = {
      'hospitalGroupId': this.logUserService.getUserHospitalGroupId(),
      'hospitalId': this.logUserService.getUserHospitalId() + '',
      'fieldId': fieldId,
    };

    this._fgs.getFieldUsage(configuration).subscribe(res => {
      if (res && res.length > 0) {
        const modal: ModalOptions = new ModalOptions();
        modal.class = 'modal-small';
        modal.initialState = {
          formsUsed: res
        };
        this.bsModalService.show(FieldUsageComponent, modal);
      }
    });
  }

  setWidth(widget: any, size: number, e: MouseEvent, gridster) {
    e.stopPropagation();
    e.preventDefault();
    if (size < 1) {
      size = 1;
    }
    widget.w = size;
    gridster.reload();
    return false;
  }

  optionsChange(options: IGridsterOptions) {
    this._fgs.gridsterOptions = options;
  }

  removeField($event, index: number, gridster: GridsterComponent) {
    this.fieldRemoved.emit(this._fgs.widgets[index]);
    $event.preventDefault();
    this._fgs.widgets.splice(index, 1);
    // remove expression builder entry for current field item
    this._fgs.ruleComponents.splice(index, 1);
    this._fgs.onDropdownResourceSelected.emit(false);
  }

  resetWidgets() {
    this._fgs.widgets = this.widgetsCopy.map(widget => ({...widget}));
  }

	showPreview() {
		if (this._fgs.widgets.length > 0) {
			if (this.previewSelected == false) {
				this.previewSelected = true;

				this.bsModalRef = this.BsModalService.show(FormPreviewComponent, {
					class: 'pers-form-preview-modal',
					ignoreBackdropClick: false
				});

        console.log(this._fgs.widgets);
				this.bsModalRef.content.popupInit(this.bsModalRef, {
					name: this._fgs.formName,
					data: this._fgs.widgets
				});

			}
		}

		this.BsModalService.onHide.subscribe(res => {
			this.previewSelected = false;
		});
	}

  viewGrid() {
    // Toggle grids
    this._fgs.gridsterOptions.lines.always = !this._fgs.gridsterOptions.lines.always;
    this.gridster.reload();
  }

	reloadGrid() {
		this.gridster.reload();
	}

	preSave() {

		if (!this._fgs.formName || !this._fgs.formCategory || !this._fgs.formSaveOption || this._fgs.formModules.length == 0) {
			this.toastr.warning('Form settings have required inputs', 'Warning', {
				timeOut: 4000,
				progressBar: true,
				closeButton: true
			});

			return;
		}

		this.saveFormSubscription.unsubscribe();
		if (this._fgs.formName == undefined) {
			this.toastr.warning('Empty Form Name', 'Warning', {
				timeOut: 3000,
				progressBar: true,
				closeButton: true
			});
			return;
		}
		if (this._fgs.formLoadedForEdit) {
			// create formObject with object id as for update scenario
			let formObject = {
				"hospitalGroupId": Number(this.logUserService.getUserHospitalGroupId()),
				"hospitalId": this.logUserService.getUserHospitalId() + '',
				"createdBy": this.logUserService.getLogUserId() + '',
				"category": this._fgs.formCategory,
				"fieldName": this._fgs.formName,
				"definition": encodeURI(JSON.stringify({
					name: this.formName,
					data: this._fgs.widgets,
					gridAvailability: this._fgs.gridAvailability,
				})),
				"applicableApplications": this._fgs.formModules,
				"saveOptions": this._fgs.formSaveOption,
				"id": this.route.snapshot.url[1].path
			};
			this._fgs.postForm(formObject).subscribe(res => {
				// once form successful, post the rule JSON entry
				let ruleJson = this._fgs.ruleJSONData;
				ruleJson.components = this._fgs.ruleComponents;
				this._fgs.updateRules(ruleJson).subscribe(response => {
          this._fgs.updateRuleJson(this.route.snapshot.url[1]);
					this.toastr.success('Form Data Saved Successfully', 'Success', {
						timeOut: 3000,
						progressBar: true,
						closeButton: true
					});
				});
			});
		} else {
			let formObject = {
				"hospitalGroupId": Number(this.logUserService.getUserHospitalGroupId()),
				"hospitalId": this.logUserService.getUserHospitalId() + '',
				"createdBy": this.logUserService.getLogUserId() + '',
				"category": this._fgs.formCategory,
				"fieldName": this._fgs.formName,
				"definition": encodeURI(JSON.stringify({
					name: this.formName,
					data: this._fgs.widgets,
					gridAvailability: this._fgs.gridAvailability
				})),
				"applicableApplications": this._fgs.formModules,
				"saveOptions": this._fgs.formSaveOption
			};

      this._fgs.postForm(formObject).subscribe(res => {
        let components: any[] = [];
        this._fgs.ruleComponents.forEach(element => {
          components.push({
            componentKey: element.componentKey,
            componentId: element.componentId,
            componentName: element.componentName,
            componentType: element.componentType,
            rules: element.rules
          });
        });

        let ruleJson = {
          isActive: true,
          moduleKey: "CUSTOM_FORMS",
          moduleName: "Custom Forms",
          screenKey: res.id,
          screenName: res.fieldName,
          components: components
        };
        this._fgs.postRule(ruleJson).subscribe(ruleResponse => {
          this.toastr.success('Form Data Updated Successfully', 'Success', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true
          });
        });
        this._fgs.formLoadedForEdit = true;
      });
    }
  }

	onFieldClick(field) {
		let index = this._fgs.widgets.indexOf(field);
		this._fgs.fieldMetaDateUpdateSetter({ key: index, value: field });
		this._fieldgs.editSetter(field['controlContent']);
    this._fgs.hideFieldMetaData.emit(false);
    this.selectedWidget = field.controlContent.label;

    this._fgs.loadFieldAttributes.emit({
      index: index,
      widget: this._fgs.widgets[index]
    });
	}

  duplicateField(index, widget) {
    // Clone object
    const clone = JSON.parse(JSON.stringify(widget));
    delete clone.xLg;
    delete clone.xSm;
    delete clone.xMd;
    delete clone.yLg;
    delete clone.ySm;
    delete clone.yMd;
    delete clone.controlContent.fieldDesignId;
    clone['duplicatedFromPrevious'] = true;
    clone['controlContent']['fieldDesignId'] = uuid.v4();
    this._fgs.widgets.splice(index + 1, 0, clone);
    this._fgs.ruleComponents.splice(index + 1, 0, {
      componentKey: widget.title,
      componentName: widget.title,
      componentType: widget.content,
      rules: []
    });
  }

  reloadGridsterConfig(gridster: any) {
    setTimeout(() => {
      gridster.reload();
      this.gridster.updateGridsterElementData();
    }, 500);
  }

	addNewUIComponent(item) {
		this._fgs.widgets.push({
			x: 4, y: 0, w: 3, h: 1, 
			title: item.value,
			dragAndDrop: true,
			resizable: true,
			content: item.key,
			controlContent: item,
			masterType: item.key
		});
	}
}
